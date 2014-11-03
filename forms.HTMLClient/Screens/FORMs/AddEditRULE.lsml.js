/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditRULE.created = function (screen) {
    // Write code here.
    var existingRule = screen.RULE;
    var ruleName = (existingRule.RULE_LABEL ? existingRule.RULE_LABEL : "(NEW)");
    screen.details.displayName = "Add/Edit RULE: " + ruleName;
};