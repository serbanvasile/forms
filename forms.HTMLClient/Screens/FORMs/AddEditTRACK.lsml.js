/// <reference path="~/GeneratedArtifacts/viewModel.js" />

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

var choicesDisplayed = false;
myapp.AddEditTRACK.CHOICEs_BY_FORMFIELDID_Tap_execute = function (screen) {

    //add new track form field
    var newTrackFormField = myapp.activeDataWorkspace.ApplicationData.TRACK_FORM_FIELDs.addNew();
    newTrackFormField.setTRACK(screen.TRACK);
    newTrackFormField.setFORM_FIELD(screen.FORM_FIELDs_BY_FORMID.selectedItem);
    newTrackFormField.setVALUE(screen.CHOICEs_BY_FORMFIELDID.selectedItem);

    //delete existing track form field
    if (screen.TRACK_FORM_FIELDs.selectedItem) {
        screen.TRACK_FORM_FIELDs.deleteSelected();
    }

    myapp.applyChanges()
        .then(
            function () {
                screen.closePopup("popChoiceByFormFieldId");
            }
        )
        .then(
            function () {
                screen.FORM_FIELDs_BY_FORMID.load(true);
            }
        )
        .then(function () {
            setTimeout(function () {
                choicesDisplayed = false;
            }, 500)
        })
};

myapp.AddEditTRACK.CancelDeleteValue_Tap_execute = function (screen) {
    // Write code here.
    return screen.closePopup("popDeleteValue");
};
myapp.AddEditTRACK.DeleteCurrentValue_Tap_execute = function (screen) {
    // Write code here.
    return screen.getTRACK_FORM_FIELDs().then(function (TRACK_FORM_FIELDs) {
        TRACK_FORM_FIELDs.deleteSelected();
        return myapp.applyChanges()
            .then(function () {
                return screen.closePopup("popDeleteValue");
            })
            .then(function () {
                return screen.FORM_FIELDs_BY_FORMID.load(true);
            });
    });
};

myapp.AddEditTRACK.VALUE_render = function (element, contentItem) {
    // Write code here.

    if (typeof (contentItem.data.VALUE) == "undefined" || contentItem.data.VALUE == null) {
        return;
    }

    var valueId = contentItem.data.VALUE.Id;
    var separator = '|';
    var allParentChoiceIds = '';
    var allChildChoiceIds = '';
    contentItem.data.VALUE.PARENT_CHOICEs.array.forEach(function (parentChoice, idx) {
        allParentChoiceIds += (separator + parentChoice.Id);
    })
    contentItem.data.VALUE.CHILD_CHOICEs.array.forEach(function (childChoice, idx) {
        allChildChoiceIds += (separator + childChoice.Id);
    })
    var fieldValue = $("<p>" 
        //+ valueId
        //+ '-' + allParentChoiceIds
        //+ '-' + allChildChoiceIds + '-'
        + contentItem.data.VALUE.CHOICE_LABEL
        //+ " ("
        //+ contentItem.data.VALUE.Modified
        //+ ")"
        + "</p>");
    if (!contentItem.data.FORM_FIELD.FIELD
        || !contentItem.parent.parent.data.FIELD
        || contentItem.data.FORM_FIELD.FIELD.FIELD_NAME != contentItem.parent.parent.data.FIELD.FIELD_NAME) {
        $(element).parentsUntil(".msls-listview").remove();
    } else {
        fieldValue.appendTo($(element));
    }
};


myapp.AddEditTRACK.created = function (screen) {

    var formFieldsVisualCollection = screen.FORM_FIELDs_BY_FORMID;

    function selectFirstField() {
        return screen.getTRACK_FORM_FIELDs().then(function (TRACK_FORM_FIELDs) {
            $.each(TRACK_FORM_FIELDs.data, function (tff_key, tff_item) {
                if (formFieldsVisualCollection.selectedItem &&
                    formFieldsVisualCollection.selectedItem.Id == tff_item.FORM_FIELD.Id) {
                    TRACK_FORM_FIELDs.selectedItem = tff_item;
                    return false;
                }
            });
        });
    }

    function displayFieldChoices() {
        myapp.showScreen("BrowseCHOICEs", null, {
            beforeShown: function (browseChoiceScreen) {
                alert("showing the choices for field " + formFieldsVisualCollection.selectedItem.FIELD.FIELD_LABEL);
                // Check to see if this is a duplicate -- construct a query
                //localhost:50275/ApplicationData.svc/CHOICEs?$top=50&$filter=(PARENT_CHOICEs/any(x: x/Id eq 1) or PARENT_CHOICEs/any(x: x/Id eq 4) or PARENT_CHOICEs/any(x: x/Id eq 1002))
                var filter =
                    "FORM_FIELD/Id eq " + msls._toODataString(formFieldsVisualCollection.selectedItem.Id, ":Int32");
                //screen.CHOICEs_BY_FORMFIELDID
                //    .refresh()
                myapp.activeDataWorkspace.ApplicationData
                    .CHOICEs
                    .filter(filter)
                    .execute().then(
                        function (result) {
                            var newChoice = new myapp.CHOICE;
                            browseChoiceScreen.CHOICEs = result.results;
                        });                                                       
                    //.then(
                //    function () {
                //        return new WinJS.Promise(function (complete) {
                //            if (screen.CHOICEs_BY_FORMFIELDID.data.length > 0) {
                //                alert("refreshed successfully choices by formfield id");
                //                screen.CHOICEs_BY_FORMFIELDID.selectedItem = screen.CHOICEs_BY_FORMFIELDID.data[0];
                //                //add new track form field
                //                var newTrackFormField = myapp.activeDataWorkspace.ApplicationData.TRACK_FORM_FIELDs.addNew();
                //                newTrackFormField.setTRACK(screen.TRACK);
                //                newTrackFormField.setFORM_FIELD(screen.FORM_FIELDs_BY_FORMID.selectedItem);
                //                newTrackFormField.setVALUE(screen.CHOICEs_BY_FORMFIELDID.selectedItem);
                //                complete(true);
                //            } else {
                //                alert("could not refresh choices by formfield id");
                //                complete(false);
                //            }
                //        });
                //    }
                //);
                return true;
            },
            afterClosed: function (browseChoiceScreen, navigationAction) {
                if (navigationAction == msls.NavigateBackAction.commit) {
                    alert("commited");
                    myapp.applyChanges();
                } else {
                    alert("cancelled");
                    myapp.cancelChanges();
                }
                //no matter if we commited or cancelled, we need to reload
                //the base form we came from
                screen.FORM_FIELDs_BY_FORMID.load(true);
            }
        });
    }

    function filterChoicesByFormId() {
        myapp.showBrowseCHOICEs()

        // get the values entered
        var PatientName = screen.PatientName;
        var PatientAge = screen.PatientAge;

        // Always show step 2 at this point
        screen.showTab("Step2");
        screen.details.displayName = "Step 2";

        // Clear ValidationMessage
        screen.ValidationMessage = "";

        if (PatientName == null || PatientAge == null) {
            screen.ValidationMessage = "Both values are required -- Click Back and try again";
            // Hide the Save button
            var SaveButton = screen.findContentItem("Save");
            SaveButton.isVisible = false;
            // Stop processing
            return;
        }

        // Check to see if this is a duplicate -- construct a query
        var filter = "(PatientName eq " + msls._toODataString(PatientName, ":String") +
            ") and (PatientAge eq " + msls._toODataString(PatientAge, ":Int32") + ")";
        // Query the database
        myapp.activeDataWorkspace.ApplicationData
            .Patients
            .filter(filter)
            .execute()
            .then(function (result) {
                // Get the results of the query
                var currentPatient = result.results[0];
                // If there are any results show duplicate record error
                if (currentPatient != null && currentPatient != 'undefined') {
                    screen.ValidationMessage = "Duplicate Found -- Click Back and try again";
                    // Hide the Save button
                    var SaveButton = screen.findContentItem("Save");
                    SaveButton.isVisible = false;
                } else {
                    // There is no duplication
                    screen.ValidationMessage = "Validation passed -- Save to continue";
                    // Show the Save button
                    var SaveButton = screen.findContentItem("Save");
                    SaveButton.isVisible = true;
                }
            }, function (error) {
                alert(error);
            });
    }

    function onVisualCollectionSelectedItem() {
        selectFirstField()
            .then(function () {
                if (choicesDisplayed == false) {
                    //displayFieldChoices();
                    screen.showPopup('popChoiceByFormFieldId');
                    choicesDisplayed = true;
                }
            })
        return true;
    }

    formFieldsVisualCollection.addChangeListener("selectedItem", onVisualCollectionSelectedItem);

};


myapp.AddEditTRACK.CHOICEs_BY_FORMFIELDID_selectedItem_CHOICE_LABEL_postRender = function (element, contentItem) {
    var choiceVal = contentItem.data.CHOICE_LABEL;
    var choiceFld;

    //we need to examine if the choice we want to display has parent choices
    //if we have parent choices, one of them needs to have been addressed in one of the prior fields
    var choiceHasParents = false;
    //var choiceParents = contentItem.data.PARENT_CHOICEs;
    contentItem.data.getPARENT_CHOICEs().then(function (CHOICE_PARENT_CHOICEs) {
        choiceParents = CHOICE_PARENT_CHOICEs;
    }).then(function(){
        choiceHasParents = (choiceParents.array.length > 0 ? true : false);
        choiceFld = $("<p>"
            + choiceVal
            //+ (choiceHasParents ? ' P ' : ' NP ')
            + "</p>");
        if (!choiceHasParents) {
            choiceFld.appendTo($(element));
            return;
        }        

        var validChoice = false;
        //after finding out that the current choice has parents, we need to look at the 
        //already selected choices (values of type choice) from the prior fields to identify if they are or not one of the valid parents
        contentItem.screen.TRACK_FORM_FIELDs.data.forEach(
            function (trackFormField, idx) {
                choiceParents.array.forEach(function (choiceParentItem, idx) {
                    //find the parent that corresponds to the choice that is analyzed
                    if (choiceParentItem.PARENT_CHOICE.Id == trackFormField.VALUE.Id) {
                        //once the parent is found, go through all the valid child choices and see if we match
                        trackFormField.VALUE.CHILD_CHOICEs.array.forEach(function (childChoiceItem, idx) {
                            if (childChoiceItem.CHILD_CHOICE && childChoiceItem.CHILD_CHOICE.Id == contentItem.data.Id
                                ) {
                                validChoice = true;                                
                            }
                        });
                    }
                });
            }
        );
        if (validChoice == false) {
            $(element).parentsUntil(".msls-listview").remove();
        } else {
            choiceFld.appendTo($(element));
        }
        return;
    });

};

