/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditFORM.created = function (screen) {
    var existingForm = screen.FORM;
    var formName = (existingForm.FORM_LABEL ? existingForm.FORM_LABEL : "(NEW)");
    screen.details.displayName = "Add/Edit FORM: " + formName;
};