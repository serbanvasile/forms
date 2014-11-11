/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditTRACK.Method_execute = function (screen) {
    // Write code here.
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

