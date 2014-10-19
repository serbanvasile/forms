/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditFORM.created = function (screen) {
    var existingForm = screen.FORM;
    var formName = (existingForm ? existingForm.FORM_LABEL : "(NEW)");
    screen.details.displayName = formName + " Form";
};