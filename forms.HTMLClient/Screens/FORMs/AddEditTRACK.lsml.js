/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditTRACK.Method_execute = function (screen) {
    return myapp.applyChanges().then(function () {
        var newTrackFormField = myapp.activeDataWorkspace.ApplicationData.TRACK_FORM_FIELDs.addNew();
        newTrackFormField.setTRACK(screen.TRACK);
        myapp.showAddEditTRACK_FORM_FIELD(newTrackFormField);
    });
};

//myapp.AddEditTRACK.GetFormFieldLink_execute = function (screen) {
//    // Write code here.
//    // The hash is present on non-home screens.  Since we're
//    // doing this on the home screen we could skip this part
//    // but here it is for completeness.
//    var hashPos = window.location.href.indexOf("#");
//    if (hashPos >= 0)
//        var baseUrl = window.location.href.substr(0, hashPos);
//    else
//        var baseUrl = window.location.href;
//    //var fullUrl = baseUrl + "?entity=ApplicationData/TRACK_FORM_FIELDs(" +
//    //              screen.TRACK_FORM_FIELDs.selectedItem.Id + ")";
//    //screen.FormFieldUrl = fullUrl;
//    //screen.showPopup("FormFieldPopUp");

//};


myapp.AddEditTRACK.CHOICEs_BY_FORMFIELDID_Tap_execute = function (screen) {
    var refTrackFormField = screen.FORM_FIELDs_BY_FORMID.selectedItem;
    var existingTrackFormField = screen.TRACK_FORM_FIELDs.selectedItem;
    var newTrackFormField;
    if (existingTrackFormField) {
        newTrackFormField = existingTrackFormField;
    } else {
        newTrackFormField = myapp.activeDataWorkspace.ApplicationData.TRACK_FORM_FIELDs.addNew();
    }     
    newTrackFormField.setTRACK(screen.TRACK);
    newTrackFormField.setFORM_FIELD(screen.FORM_FIELDs_BY_FORMID.selectedItem);
    newTrackFormField.setVALUE(screen.CHOICEs_BY_FORMFIELDID.selectedItem);

    return myapp.applyChanges()
        .then(function () {
            screen.closePopup("popChoiceByFormFieldId");
        })
        .then(function () {
            screen.FORM_FIELDs_BY_FORMID.load(true);
        });
 };
myapp.AddEditTRACK.CancelDeleteValue_Tap_execute = function (screen) {
    // Write code here.
    screen.closePopup("popDeleteValue");
};
myapp.AddEditTRACK.DeleteCurrentValue_Tap_execute = function (screen) {
    // Write code here.
    screen.getTRACK_FORM_FIELDs().then(function (TRACK_FORM_FIELDs) {
        TRACK_FORM_FIELDs.deleteSelected();
        return myapp.applyChanges()
            .then(function () {
                screen.closePopup("popDeleteValue");
            })
            .then(function () {
                screen.FORM_FIELDs_BY_FORMID.load(true);
            });
    });
};
