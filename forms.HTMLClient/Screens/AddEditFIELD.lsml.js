/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditFIELD.created = function (screen) {
    // Write code here.
    var existingField = screen.FIELD;
    var fieldName = (existingField.FIELD_LABEL ? existingField.FIELD_LABEL : "(NEW)");
    screen.details.displayName = "Add/Edit FIELD: " + fieldName;
};