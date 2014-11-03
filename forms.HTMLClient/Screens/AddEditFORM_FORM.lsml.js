/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditFORM_FORM.created = function (screen) {
    // Write code here.
    var parentFormName = screen.FORM_FORM.PARENT_FORM.FORM_LABEL;
    var existingChildForm = screen.FORM_FORM.CHILD_FORM;
    var childFormdName = (existingChildForm ? existingChildForm.FORM_LABEL : "(NEW)");
    screen.details.displayName = "Add/Edit Child Form: " + childFormdName;
};