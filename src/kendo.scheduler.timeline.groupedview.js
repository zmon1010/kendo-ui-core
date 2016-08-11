(function(f, define){
    define([ "./kendo.core"], f);
})(function(){

(function(kendo) {

	function setColspan(columnLevel) {
        var count = 0;
        if (columnLevel.columns) {
            for (var i = 0; i < columnLevel.columns.length; i++) {
                count += setColspan(columnLevel.columns[i]);
            }
            columnLevel.colspan = count;
            return count;
        } else {
            columnLevel.colspan = 1;
            return 1;
        }
    }

    var getMilliseconds = kendo.date.getMilliseconds,
        CURRENT_TIME_MARKER_CLASS = "k-current-time",
        CURRENT_TIME_MARKER_ARROW_CLASS = "k-current-time-arrow",
        SCHEDULER_HEADER_WRAP_CLASS = "k-scheduler-header-wrap",
        BORDER_SIZE_COEFF = 0.8666;

    var TimelineGroupedView = kendo.Class.extend({
    	init: function(view) {
    		this._view = view;
    	},

    	_getTimeSlotByPosition: function(x, y, groupIndex) {
    		var group = this._view.groups[groupIndex];

			return group.timeSlotByPosition(x, y);
    	},

    	_hideHeaders: function() {
    		var view = this._view;

			view.timesHeader.find("table tr:last").hide(); /*Chrome fix, use CSS selector*/
            view.datesHeader.find("table tr:last").hide();
    	},

		_setColspan: function(timeColumn) {
			setColspan(timeColumn);
		},

		_createRowsLayout: function(resources, rows, groupHeaderTemplate) {
    		var view = this._view;

    		return view._createRowsLayout(resources, rows, groupHeaderTemplate);
		},

		_createVerticalColumnsLayout: function(resources, rows, groupHeaderTemplate, columns) {

    		return columns;
		},

		_createColumnsLayout: function(resources, columns, groupHeaderTemplate) {
    		var view = this._view;

    		return view._createColumnsLayout(resources, columns, groupHeaderTemplate);
		},

		_getRowCount: function() {
    		var view = this._view;

			return view._groupCount();
		},

		_getGroupsCount: function(groupsCount) {
    		return groupsCount;
		},

		_addContent: function(dates, columnCount, groupsCount, rowCount, start, end, slotTemplate, isVerticalGrouped) {
			var view = this._view;
			var html;
			var options = view.options;
			
			var appendRow = function(date) {
                var content = "";
                var classes = "";
                var tmplDate;

                var resources = function(groupIndex) {
                    return function() {
                        return view._resourceBySlot({ groupIndex: groupIndex });
                    };
                };

                if (kendo.date.isToday(dates[idx])) {
                    classes += "k-today";
                }

                if (kendo.date.getMilliseconds(date) < kendo.date.getMilliseconds(options.workDayStart) ||
                    kendo.date.getMilliseconds(date) >= kendo.date.getMilliseconds(options.workDayEnd) ||
                    !view._isWorkDay(dates[idx])) {
                    classes += " k-nonwork-hour";
                }

                content += '<td' + (classes !== "" ? ' class="' + classes + '"' : "") + ">";
                tmplDate = kendo.date.getDate(dates[idx]);
                kendo.date.setTime(tmplDate, kendo.date.getMilliseconds(date));

                content += slotTemplate({ date: tmplDate, resources: resources(isVerticalGrouped ? rowIdx : groupIdx) });
                content += "</td>";

                return content;
            };

			for (var rowIdx = 0; rowIdx < rowCount; rowIdx++) {
                html += '<tr>';
				for (var groupIdx = 0 ; groupIdx < groupsCount; groupIdx++) {
					for (var idx = 0, length = columnCount; idx < length; idx++) {
						html += view._forTimeRange(start, end, appendRow);
					}
				}
			    html += "</tr>";
            }
    		return html;
		},

		_addTimeSlotsCollections: function(groupCount, datesCount, tableRows, interval, isVerticallyGrouped) {
			var view = this._view;
			var rowCount = tableRows.length;
	
    		if (isVerticallyGrouped) {
                rowCount = Math.floor(rowCount / groupCount);
            }

            for (var groupIndex = 0; groupIndex < groupCount; groupIndex++) {
				var rowMultiplier = 0;
				var group = view.groups[groupIndex];
				var time;

				if (isVerticallyGrouped) {
					rowMultiplier = groupIndex;
				}

				var rowIndex = rowMultiplier * rowCount;
				var cellMultiplier = 0;

				if (!isVerticallyGrouped) {
					cellMultiplier = groupIndex;
				}

				var cells = tableRows[rowIndex].children;
				var cellsPerGroup = cells.length / (!isVerticallyGrouped ? groupCount : 1);
				var cellsPerDay = cellsPerGroup / datesCount;

				for (var dateIndex = 0; dateIndex < datesCount; dateIndex++) {
					var cellOffset = dateIndex * cellsPerDay + (cellsPerGroup * cellMultiplier);
					time = getMilliseconds(new Date(+view.startTime()));

					for (var cellIndex = 0; cellIndex < cellsPerDay ; cellIndex++) {

						view._addTimeSlotToCollection(group, cells, cellIndex, cellOffset, dateIndex, time, interval);
						time += interval;
					}
				}
			}
		},

		_getVerticalGroupCount: function(groupsCount) {

    		return groupsCount;
		},

		_getVerticalRowCount: function(eventGroups, groupIndex, maxRowCount) {
			var view = this._view;

    		return view._isVerticallyGrouped() ? eventGroups[groupIndex].maxRowCount : maxRowCount;
		},

		_renderEvent: function(eventGroup, event, adjustedEvent, group, range, container) {
			var view = this._view;
			var element; 

            element = view._createEventElement(adjustedEvent.occurrence, event, range.head || adjustedEvent.head, range.tail || adjustedEvent.tail);
            element.appendTo(container).css({top: 0, height: view.options.eventHeight});

            var eventObject = {
                start: adjustedEvent.occurrence._startTime || adjustedEvent.occurrence.start,
                end: adjustedEvent.occurrence._endTime || adjustedEvent.occurrence.end,
                element: element,
                uid: event.uid,
                slotRange: range,
                rowIndex: 0,
                offsetTop: 0
            };

            eventGroup.events[event.uid] = eventObject;

            view.addContinuousEvent(group, range, element, event.isAllDay);
            view._arrangeRows(eventObject, range, eventGroup);
		},
		
		_verticalCountForLevel: function(level) {
			var view = this._view;
			
			return view._rowCountForLevel(level);
		},

		_horizontalCountForLevel: function(level) {
			var view = this._view;
			
			return view._columnCountForLevel(level);
		},

        _updateCurrentVerticalTimeMarker: function(ranges, currentTime) {
			var view = this._view;		
		    var elementHtml = "<div class='" + CURRENT_TIME_MARKER_CLASS + "'></div>";
            var headerWrap = view.datesHeader.find("." + SCHEDULER_HEADER_WRAP_CLASS);
            var left = Math.round(ranges[0].innerRect(currentTime, new Date(currentTime.getTime() + 1), false).left);
            var timesTableMarker = $(elementHtml)
                    .prependTo(headerWrap)
                    .addClass(CURRENT_TIME_MARKER_ARROW_CLASS + "-down");

            timesTableMarker.css({
                left: view._adjustLeftPosition(left - (timesTableMarker.outerWidth() * BORDER_SIZE_COEFF / 2)),
                top: headerWrap.find("tr:last").prev().position().top
            });

            $(elementHtml).prependTo(view.content).css({
                left: view._adjustLeftPosition(left),
                width: "1px",
                height: view.content[0].scrollHeight - 1,
                top: 0
            });
        },

        _changeGroup: function() { },

        _prevGroupSlot: function(slot, group, isDay) {
            var view = this._view;

            if (view._isVerticallyGrouped()) {
                return slot;
            } else {
                var collection = group._collection(0, isDay);
                return collection.last();
            }
        },

        _nextGroupSlot: function(slot, group, isDay) {
            var view = this._view;

            if (view._isVerticallyGrouped()) {
                return slot;
            } else {
                var collection = group._collection(0, isDay);
                return collection.first();
            }
        },

        _verticalSlots: function(selection, reverse) {
             var view = this._view;

             return view._changeGroup(selection, reverse);
        },

		 _verticalMethod: function(reverse) {

              return  reverse ? "leftSlot" : "rightSlot"; 
		 },

		 _normalizeVerticalSelection: function() { },

		 _horizontalSlots: function(selection, group, method, startSlot, endSlot, multiple, reverse) {
            var view = this._view;
            var result = {};

            result.startSlot = group[method](startSlot);
            result.endSlot = group[method](endSlot);

            if (!multiple && view._isHorizontallyGrouped() && (!result.startSlot || !result.endSlot)) {
                result.startSlot = result.endSlot = view._changeGroup(selection, reverse);
            }

            return result;
        },
        
        _changeVerticalViewPeriod: function() {
            return false;
        },

        _changeHorizontalViewPeriod: function(slots, shift, selection, reverse) {
            var view = this._view;

            if ((!slots.startSlot ||!slots.endSlot ) && !shift && view._changeViewPeriod(selection, reverse, false)) {
                return true;
            }
            return false;
        },

        _updateDirection: function(selection, ranges, shift, reverse) {
            var view = this._view;

            view._updateDirection(selection, ranges, shift, reverse, true);
        }
    });

	 var TimelineGroupedByDateView = kendo.Class.extend({
    	init: function(view) {
    		this._view = view;
    	},

		_getTimeSlotByPosition: function(x, y, groupIndex) {
    		var group = this._view.groups[groupIndex];

			return group.timeSlotByPosition(x, y, true);
		},

		_hideHeaders: function() {
    		var view = this._view;

    		if (!view._isVerticallyGrouped()) {
				view.timesHeader.find("table tr").eq(2).hide();
                view.datesHeader.find("table tr").eq(2).hide();  
    		}
		},
		_setColspan: function() {},

		_createRowsLayout: function(resources, rows, groupHeaderTemplate, columns) {
			var view = this._view;

    		return view._createDateLayout(columns, null, true);
		},	

		_createVerticalColumnsLayout: function(resources, rows, groupHeaderTemplate) {
			var view = this._view;

    		return view._createColumnsLayout(resources, null, groupHeaderTemplate);
		},	

		_createColumnsLayout: function(resources, columns, groupHeaderTemplate, subColumns) {
    		var view = this._view;

    		return view._createColumnsLayout(resources, columns, groupHeaderTemplate, subColumns, true);
		},

		_getRowCount: function(level) {
    		var view = this._view;
	
    		return view._rowCountForLevel(level);
		},

		_getGroupsCount: function() {
    		var view = this._view;
	
    		return view._groupCount();
		},

		_addContent: function(dates, columnCount, groupsCount, rowCount, start, end, slotTemplate, isVerticalGrouped) {
			var view = this._view;
			var html;
			var options = view.options;
			
			var appendRow = function(date) {
                var content = "";
                var classes = "";
                var tmplDate;

                var resources = function(groupIndex) {
                    return function() {
                        return view._resourceBySlot({ groupIndex: groupIndex });
                    };
                };

                if (kendo.date.isToday(dates[idx])) {
                    classes += "k-today";
                }

                if (kendo.date.getMilliseconds(date) < kendo.date.getMilliseconds(options.workDayStart) ||
                    kendo.date.getMilliseconds(date) >= kendo.date.getMilliseconds(options.workDayEnd) ||
                    !view._isWorkDay(dates[idx])) {
                    classes += " k-nonwork-hour";
                }

                content += '<td' + (classes !== "" ? ' class="' + classes + '"' : "") + ">";
                tmplDate = kendo.date.getDate(dates[idx]);
                kendo.date.setTime(tmplDate, kendo.date.getMilliseconds(date));

                content += slotTemplate({ date: tmplDate, resources: resources(isVerticalGrouped ? rowIdx : groupIdx) });
                content += "</td>";

                return content;
            };

			for (var rowIdx = 0; rowIdx < rowCount; rowIdx++) {
                html += '<tr>';
				for (var idx = 0, length = columnCount; idx < length; idx++) {
					for (var groupIdx = 0 ; groupIdx < groupsCount; groupIdx++) {                     
						html += view._forTimeRange(start, end, appendRow, false, isVerticalGrouped);
					}
					if(isVerticalGrouped){
						break;
					} 
				}
			   html += "</tr>";
            }
	
    		return html;
		},

		_addTimeSlotsCollections: function(groupCount, datesCount, tableRows, interval, isVerticallyGrouped) {
			var view = this._view;
			var rowCount = tableRows.length;
	
    		 if (isVerticallyGrouped) {                
                rowCount = rowCount/datesCount;
    		 }

			for (var dateIndex = 0; dateIndex < datesCount; dateIndex++) {
				var rowMultiplier = 0;
				var time;

				if (isVerticallyGrouped) {
					rowMultiplier = dateIndex;
				}

				var rowIndex = rowMultiplier * rowCount;
				var cellMultiplier = 0;            
				var cells = tableRows[rowIndex].children;
				var cellsPerGroup = isVerticallyGrouped ? rowCount : cells.length / (datesCount * groupCount);
				var cellsPerDay = cells.length / datesCount;
				var cellOffset;

				time = getMilliseconds(new Date(+view.startTime()));

				for (var cellIndex = 0; cellIndex < cellsPerGroup; cellIndex++) {                       
					if (!isVerticallyGrouped) {
						cellOffset = (dateIndex * cellsPerDay) + (groupCount * cellIndex);                
						cellMultiplier++;                           
					} else{
						cellOffset = 0; 
						cells = tableRows[cellIndex + (cellsPerGroup*dateIndex)].children;
					}

					for (var groupIndex = 0; groupIndex < groupCount ; groupIndex++) {
						var group = view.groups[groupIndex];

						view._addTimeSlotToCollection(group, cells, groupIndex, cellOffset, dateIndex, time, interval);                      
					}
					time += interval;                       
				}                  
			 }
		},

		_getVerticalGroupCount: function(groupsCount) {
			var view = this._view;

    		return view._dates.length * groupsCount;
		},

		_getVerticalRowCount: function(eventGroups, groupIndex, maxRowCount) {

			return maxRowCount;
		},

		_renderEvent: function(eventGroup, event, adjustedEvent, group, range, container, startIndex, endIndex) {
			var view = this._view;
			var element; 
    		var eventObjects = [];

            for (var i = range.start.index; i <= range.end.index; i++) {
                element = view._createEventElement(adjustedEvent.occurrence, event, i !== endIndex, i !== startIndex);
                element.appendTo(container).css({top: 0, height: view.options.eventHeight});
                var currentSlot = group._timeSlotCollections[0]._slots[i];
                var dateRange = group.timeSlotRanges(currentSlot.start, currentSlot.end, false)[0];                                  
                   
                    var eventObject = {
                    start: i === startIndex ? adjustedEvent.occurrence._startTime || adjustedEvent.occurrence.start : currentSlot.start,
                    end: i === endIndex ? adjustedEvent.occurrence._endTime || adjustedEvent.occurrence.end : currentSlot.end,
                    element: element,
                    uid: event.uid,
                    slotRange: dateRange,
                    rowIndex: 0,
                    offsetTop: 0
                };

                eventGroup.events[event.uid] = eventObject;
                eventObjects.push(eventObject);

                view.addContinuousEvent(group, dateRange, element, event.isAllDay);
                view._arrangeRows(eventObject, dateRange, eventGroup);
            }
            eventGroup.events[event.uid] = eventObjects;
		},
		
		_verticalCountForLevel: function(level) {
			var view = this._view;
			
			return view._columnCountForLevel(level);
		},
		
		_horizontalCountForLevel: function(level, columnLevel) {
			var view = this._view;
			
			return view._columnCountForLevel(columnLevel) / view._columnCountForLevel(2);
		},

        _updateCurrentVerticalTimeMarker: function(ranges,currentTime) {
		    var view = this._view;		
		    var firstTimesCell = view.times.find("tr:first th:first");
            var lastTimesCell = view.times.find("tr:first th:last");
            var elementHtml = "<div class='" + CURRENT_TIME_MARKER_CLASS + "'></div>";
            var timesTableMarker = $(elementHtml).prependTo(view.times);
            var markerTopPosition = Math.round(ranges[0].innerRect(currentTime, new Date(currentTime.getTime() + 1), false).top);
            var timesTableMarkerCss = {};

            if (this._isRtl) {
                timesTableMarkerCss.right = firstTimesCell.position().left + firstTimesCell.outerHeight() - lastTimesCell.outerHeight();
                timesTableMarker.addClass(CURRENT_TIME_MARKER_ARROW_CLASS + "-left");
            } else {
                timesTableMarkerCss.left = lastTimesCell.position().left;
                timesTableMarker.addClass(CURRENT_TIME_MARKER_ARROW_CLASS + "-right");
            }

            timesTableMarkerCss.top = markerTopPosition - (timesTableMarker.outerWidth() * BORDER_SIZE_COEFF / 2);

            timesTableMarker.css(timesTableMarkerCss);

            $(elementHtml).prependTo(view.content).css({
                top: markerTopPosition,
                height: "1px",
                right: "1px",
                width: view.content[0].scrollWidth,
                left: 0
            });
        },

        _changeGroup: function(selection, previous, slot) {
             var view = this._view;

             if (!slot) {
                selection.groupIndex = previous ? view.groups.length - 1 : 0;
             }
        },

         _prevGroupSlot: function(slot) {
              return slot;
        },

        _nextGroupSlot: function(slot) {
              return slot;
        },

        _changeDate: function(selection, reverse, slot) {
            var view = this._view;
            var group = view.groups[selection.groupIndex];
            var collections, index;

            if (reverse) {
                  collections = group._getCollections(false);
                  index = slot.index - 1;

                  if (index >= 0) {
                      return  collections[0]._slots[index];
                  }
              } else {
                  collections = group._getCollections(false);
                  index = slot.index + 1;

                  if (collections[0] && collections[0]._slots[index]) {
                      return  collections[0]._slots[index];
                  }
               }
        },

        _verticalSlots: function (selection, reverse, slot) {
            return this._changeDate(selection, reverse, slot);
        },

        _verticalMethod: function(reverse, multiple) {
            if (multiple) {
               return reverse ? "upSlot" : "downSlot";
            } else {
               return  reverse ? "leftSlot" : "rightSlot"; 
            }
        },

        _normalizeVerticalSelection: function(selection, ranges, reverse, multiple) {
            var view = this._view;

            if (!multiple) {
                return view._normalizeVerticalSelection(selection, ranges, reverse);          
            }
        },

        _horizontalSlots: function(selection, group, method, startSlot, endSlot, multiple, reverse) {
             var view = this._view;
             var tempSlot = view._changeGroup(selection, reverse);
             var result = {};

            if (!tempSlot) {
                if (!view._isVerticallyGrouped()) {
                    result.startSlot = group[method](startSlot);
                    result.endSlot = group[method](endSlot);
                }

            } else {
                result.startSlot = result.endSlot = tempSlot;
            }
            
            return result;
        },

        _changeVerticalViewPeriod: function(slots, shift, selection, reverse) {
            var view = this._view;

            if ((!slots.startSlot || !slots.endSlot) && !shift &&
                view._changeViewPeriod(selection, reverse, view._isVerticallyGrouped())) {
                return true;
            }
            return false;
        },

        _changeHorizontalViewPeriod: function(slots, shift, selection, reverse) {
           var view = this._view;

           if ( view._isVerticallyGrouped()) {
               return false;
           }

           if ((!slots.startSlot ||!slots.endSlot ) && !shift && view._changeViewPeriod(selection, reverse, false)) {
                return true;
            }
            return false;
        },

        _updateDirection: function(selection, ranges, shift, reverse) {
            var view = this._view;

            view._updateDirection(selection, ranges, shift, reverse, !view._isVerticallyGrouped());
        }
	 });

	 kendo.ui.scheduler.TimelineGroupedView = TimelineGroupedView;
	 kendo.ui.scheduler.TimelineGroupedByDateView = TimelineGroupedByDateView;
})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });