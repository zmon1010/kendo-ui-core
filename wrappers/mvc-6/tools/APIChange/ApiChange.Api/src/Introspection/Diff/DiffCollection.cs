
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ApiChange.Api.Introspection
{
    public class DiffCollection<T> : List<IDiffResult<T>>
    {
        public int AddedCount
        {
            get
            {
                int added = 0;
                foreach (var obj in this)
                {
                    if (obj.Operation.IsAdded)
                    {
                        added++;
                    }
                }

                return added;
            }
        }

        public int RemovedCount
        {
            get
            {
                int removed = 0;
                foreach (var obj in this)
                {
                    if (obj.Operation.IsRemoved)
                    {
                        removed++;
                    }
                }

                return removed;
            }
        }

        public IEnumerable<IDiffResult<T>> Added
        {
            get
            {
                foreach (var obj in this)
                {
                    if (obj.Operation.IsAdded)
                    {
                        yield return obj;
                    }
                }
            }
        }

        public IEnumerable<IDiffResult<T>> Removed
        {
            get
            {
                foreach (var obj in this)
                {
                    if (obj.Operation.IsRemoved)
                    {
                        yield return obj;
                    }
                }
            }
        }

        public List<T> RemovedList
        {
            get
            {
                return (from type in Removed
                        select type.ObjectV1).ToList();
            }
        }

        public List<T> AddedList
        {
            get
            {
                return (from type in Added
                        select type.ObjectV1).ToList();
            }
        }
    }
}
