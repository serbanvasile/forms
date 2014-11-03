/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditFORM_FIELD_RULE.created = function (screen) {
    // Write code here.
    var formName = screen.FORM_FIELD_RULE.FORM_FIELD.FORM.FORM_LABEL;
    var fieldName = screen.FORM_FIELD_RULE.FORM_FIELD.FIELD.FIELD_LABEL;
    var existingRule = screen.FORM_FIELD_RULE.RULE;
    var ruleName = (existingRule ? screen.FORM_FIELD_RULE.RULE.RULE_LABEL : "(NEW)");
    screen.details.displayName = "Add/Edit Rule: " + ruleName;
};