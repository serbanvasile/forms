/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditFORM_FIELD.created = function (screen) {
    // Write code here.
    //var formName = screen.FORM_FIELD.FORM.FORM_LABEL;
    var existingField = screen.FORM_FIELD.FIELD;
    var fieldName = (existingField ? existingField.FIELD_LABEL : "(NEW)");
    screen.details.displayName = "Add/Edit FIELD: " +  fieldName ;
};
myapp.AddEditFORM_FIELD.FIELD_postRender = function (element, contentItem) {
    // Write code here.
    $(element).change(function (ev) {
        alert($(ev.target).val());
    }).blur(function (ev) {
        alert($(ev.target).val());
    })
    ;
};
