using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.LightSwitch;
namespace LightSwitchApplication
{
    public partial class FORM_FIELD
    {
        partial void FORM_FIELD_NAME_Compute(ref string result)
        {
            // Set result to the desired field value
            result = this.FIELD.FIELD_LABEL;
        }
    }
}
