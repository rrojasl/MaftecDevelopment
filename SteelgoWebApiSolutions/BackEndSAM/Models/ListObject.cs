﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ListObject
    {
        public string id { get; set; }
        public string value { get; set; }

        public ListObject(string _id, string _value){
            this.id = _id;
            this.value = _value;
        }
    }
}