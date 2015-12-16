<?php

ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);

require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$spreadsheet = new \Kendo\UI\Spreadsheet('spreadsheet');

$spreadsheet->columns(5);
$spreadsheet->rows(9);
$spreadsheet->sheetsbar(false);

$contactsSheet = new \Kendo\UI\SpreadsheetSheet();
$contactsSheet->name("ContactsForm")
      ->mergedCells(array("A1:E1"));

$listSheet = new \Kendo\UI\SpreadsheetSheet();
$listSheet->name("ListValues");

$spreadsheet->addSheet($contactsSheet);
$spreadsheet->addSheet($listSheet);

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(70);
$contactsSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("CONTACTS FORM");
	$cell->fontSize(32);
	$cell->textAlign("center");
	$cell->background("rgb(96,181,255)");
	$cell->enable(false);
	$cell->color("white");

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(25);
$contactsSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("Full Name");
	$cell->textAlign("center");
	$cell->background("rgb(167,214,255)");
	$cell->enable(false);
	$cell->color("rgb(0,62,117)");

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("Email");
	$cell->textAlign("center");
	$cell->background("rgb(167,214,255)");
	$cell->enable(false);
	$cell->color("rgb(0,62,117)");

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("Date of Birth");
	$cell->textAlign("center");
	$cell->background("rgb(167,214,255)");
	$cell->enable(false);
	$cell->color("rgb(0,62,117)");

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("Phone");
	$cell->textAlign("center");
	$cell->background("rgb(167,214,255)");
	$cell->enable(false);
	$cell->color("rgb(0,62,117)");

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("Confirmed");
	$cell->textAlign("center");
	$cell->background("rgb(167,214,255)");
	$cell->enable(false);
	$cell->color("rgb(0,62,117)");

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(25);
$contactsSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("Peter Pan");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(LEN(A3)>3, LEN(A3)<200)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Full Name validation error");
		$validation->messageTemplate("The full name should be longer than 3 letters and shorter than 200.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("PeterPan@Gmail.com");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(NOT(ISERROR(FIND(\"@@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate( "Email validation error");
		$validation->messageTemplate("The value entered is not an valid email address.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value(35431);
	$cell->format("m/d/yyyy");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("date");
		$validation->comparerType("between");
		$validation->from("DATEVALUE(\"1/1/1900\")");
		$validation->to("DATEVALUE(\"1/1/1998\")");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Birth Date validaiton error");
		$validation->messageTemplate("Birth Date should be between 1899 and 1998 year.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value(359887699774);

		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(ISNUMBER(D3),LEN(D3)<14)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Phone validation error");
		$validation->messageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value(true);
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("list");
		$validation->from("ListValues!A1:B1");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Invalid value");
		$validation->messageTemplate("Valid values are 'true' and 'false'.");
		$cell->validation($validation);

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(25);
$contactsSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(LEN(A3)>3, LEN(A3)<200)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Full Name validation error");
		$validation->messageTemplate("The full name should be longer than 3 letters and shorter than 200.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(NOT(ISERROR(FIND(\"@@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate( "Email validation error");
		$validation->messageTemplate("The value entered is not an valid email address.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
	$cell->format("m/d/yyyy");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("date");
		$validation->comparerType("between");
		$validation->from("DATEVALUE(\"1/1/1900\")");
		$validation->to("DATEVALUE(\"1/1/1998\")");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Birth Date validaiton error");
		$validation->messageTemplate("Birth Date should be between 1899 and 1998 year.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(ISNUMBER(D3),LEN(D3)<14)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Phone validation error");
		$validation->messageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("list");
		$validation->from("ListValues!A1:B1");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Invalid value");
		$validation->messageTemplate("Valid values are 'true' and 'false'.");
		$cell->validation($validation);

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(25);
$contactsSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(LEN(A3)>3, LEN(A3)<200)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Full Name validation error");
		$validation->messageTemplate("The full name should be longer than 3 letters and shorter than 200.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(NOT(ISERROR(FIND(\"@@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate( "Email validation error");
		$validation->messageTemplate("The value entered is not an valid email address.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
	$cell->format("m/d/yyyy");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("date");
		$validation->comparerType("between");
		$validation->from("DATEVALUE(\"1/1/1900\")");
		$validation->to("DATEVALUE(\"1/1/1998\")");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Birth Date validaiton error");
		$validation->messageTemplate("Birth Date should be between 1899 and 1998 year.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(ISNUMBER(D3),LEN(D3)<14)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Phone validation error");
		$validation->messageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("list");
		$validation->from("ListValues!A1:B1");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Invalid value");
		$validation->messageTemplate("Valid values are 'true' and 'false'.");
		$cell->validation($validation);

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(25);
$contactsSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(LEN(A3)>3, LEN(A3)<200)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Full Name validation error");
		$validation->messageTemplate("The full name should be longer than 3 letters and shorter than 200.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(NOT(ISERROR(FIND(\"@@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate( "Email validation error");
		$validation->messageTemplate("The value entered is not an valid email address.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
	$cell->format("m/d/yyyy");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("date");
		$validation->comparerType("between");
		$validation->from("DATEVALUE(\"1/1/1900\")");
		$validation->to("DATEVALUE(\"1/1/1998\")");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Birth Date validaiton error");
		$validation->messageTemplate("Birth Date should be between 1899 and 1998 year.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(ISNUMBER(D3),LEN(D3)<14)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Phone validation error");
		$validation->messageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("list");
		$validation->from("ListValues!A1:B1");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Invalid value");
		$validation->messageTemplate("Valid values are 'true' and 'false'.");
		$cell->validation($validation);

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(25);
$contactsSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(LEN(A3)>3, LEN(A3)<200)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Full Name validation error");
		$validation->messageTemplate("The full name should be longer than 3 letters and shorter than 200.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(NOT(ISERROR(FIND(\"@@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate( "Email validation error");
		$validation->messageTemplate("The value entered is not an valid email address.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
	$cell->format("m/d/yyyy");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("date");
		$validation->comparerType("between");
		$validation->from("DATEVALUE(\"1/1/1900\")");
		$validation->to("DATEVALUE(\"1/1/1998\")");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Birth Date validaiton error");
		$validation->messageTemplate("Birth Date should be between 1899 and 1998 year.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(ISNUMBER(D3),LEN(D3)<14)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Phone validation error");
		$validation->messageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("list");
		$validation->from("ListValues!A1:B1");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Invalid value");
		$validation->messageTemplate("Valid values are 'true' and 'false'.");
		$cell->validation($validation);

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(25);
$contactsSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(LEN(A3)>3, LEN(A3)<200)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Full Name validation error");
		$validation->messageTemplate("The full name should be longer than 3 letters and shorter than 200.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(NOT(ISERROR(FIND(\"@@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate( "Email validation error");
		$validation->messageTemplate("The value entered is not an valid email address.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
	$cell->format("m/d/yyyy");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("date");
		$validation->comparerType("between");
		$validation->from("DATEVALUE(\"1/1/1900\")");
		$validation->to("DATEVALUE(\"1/1/1998\")");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Birth Date validaiton error");
		$validation->messageTemplate("Birth Date should be between 1899 and 1998 year.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(ISNUMBER(D3),LEN(D3)<14)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Phone validation error");
		$validation->messageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("list");
		$validation->from("ListValues!A1:B1");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Invalid value");
		$validation->messageTemplate("Valid values are 'true' and 'false'.");
		$cell->validation($validation);

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(25);
$contactsSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(LEN(A3)>3, LEN(A3)<200)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Full Name validation error");
		$validation->messageTemplate("The full name should be longer than 3 letters and shorter than 200.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(NOT(ISERROR(FIND(\"@@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate( "Email validation error");
		$validation->messageTemplate("The value entered is not an valid email address.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
	$cell->format("m/d/yyyy");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("date");
		$validation->comparerType("between");
		$validation->from("DATEVALUE(\"1/1/1900\")");
		$validation->to("DATEVALUE(\"1/1/1998\")");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Birth Date validaiton error");
		$validation->messageTemplate("Birth Date should be between 1899 and 1998 year.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(ISNUMBER(D3),LEN(D3)<14)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Phone validation error");
		$validation->messageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("list");
		$validation->from("ListValues!A1:B1");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Invalid value");
		$validation->messageTemplate("Valid values are 'true' and 'false'.");
		$cell->validation($validation);

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(25);
$contactsSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(LEN(A3)>3, LEN(A3)<200)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Full Name validation error");
		$validation->messageTemplate("The full name should be longer than 3 letters and shorter than 200.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(NOT(ISERROR(FIND(\"@@\", B3))), NOT(ISERROR(FIND(\".\", B3))), ISERROR(FIND(\" \", J1)), LEN(B3)>5)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate( "Email validation error");
		$validation->messageTemplate("The value entered is not an valid email address.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
	$cell->format("m/d/yyyy");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("date");
		$validation->comparerType("between");
		$validation->from("DATEVALUE(\"1/1/1900\")");
		$validation->to("DATEVALUE(\"1/1/1998\")");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Birth Date validaiton error");
		$validation->messageTemplate("Birth Date should be between 1899 and 1998 year.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("custom");
		$validation->from("AND(ISNUMBER(D3),LEN(D3)<14)");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Phone validation error");
		$validation->messageTemplate("The value entered is not an valid phone number. Please enter numeric value with less than 14 digits.");
		$cell->validation($validation);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value("");
		$validation = new \Kendo\UI\SpreadsheetSheetRowCellValidation();
		$validation->dataType("list");
		$validation->from("ListValues!A1:B1");
		//$validation->type("reject");
		//$validaiton->allowNulls(true);
		$validation->titleTemplate("Invalid value");
		$validation->messageTemplate("Valid values are 'true' and 'false'.");
		$cell->validation($validation);

$row = new \Kendo\UI\SpreadsheetSheetRow();
$row->height(70);
$listSheet->addRow($row);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value(true);

	$cell = new \Kendo\UI\SpreadsheetSheetRowCell();
	$row->addCell($cell);
	$cell->value(false);

$column = new \Kendo\UI\SpreadsheetSheetColumn();
$column->width(100);
$contactsSheet->addColumn($column);

$column = new \Kendo\UI\SpreadsheetSheetColumn();
$column->width(215);
$contactsSheet->addColumn($column);

$column = new \Kendo\UI\SpreadsheetSheetColumn();
$column->width(115);
$contactsSheet->addColumn($column);

$column = new \Kendo\UI\SpreadsheetSheetColumn();
$column->width(115);
$contactsSheet->addColumn($column);

$column = new \Kendo\UI\SpreadsheetSheetColumn();
$column->width(115);
$contactsSheet->addColumn($column);

$column = new \Kendo\UI\SpreadsheetSheetColumn();
$column->width(155);
$contactsSheet->addColumn($column);

echo $spreadsheet->render();
?>

<!-- Include JSZip to enable Excel Export-->
<script src="../content/shared/js/jszip.min.js"></script>

<?php require_once '../include/footer.php'; ?>
