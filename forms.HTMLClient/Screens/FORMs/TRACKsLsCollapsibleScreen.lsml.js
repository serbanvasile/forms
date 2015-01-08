/// <reference path="~/GeneratedArtifacts/viewModel.js" />

var _screen;
var groupCounter = 0;
var _element = new Array();
var _intTRACKId = new Array();
var SelectedEntity;

myapp.TRACKsLsCollapsibleScreen.created = function (screen) {
    // Cache screen
    _screen = screen;
    // Center Popups
    $(window).one('popupcreate', function (e) {
        $(e.target).popup({
            positionTo: 'window'
        });
    });
};
myapp.TRACKsLsCollapsibleScreen.ParentRowsLayout_postRender = function (element, contentItem) {
    // Get Section Name
    // Get Summary Property
    var entityType = contentItem.value.details.entity.details.getModel();
    var summaryAttribute = getAttributeForEntity_TRACKsLsCollapsibleScreen(entityType, ':@SummaryProperty');
    var SummaryProperty = summaryAttribute.property.name;
    var SectionName = eval('contentItem.value.' + SummaryProperty);
    // Get Section Id
    var intSectionId = contentItem.value.Id;

    // Wrap contents in a collapsible section
    if (myapp.LastSectionOpened == undefined) {
        myapp.LastSectionOpened = 0;
    };
    var option;
    if (myapp.LastSectionOpened == intSectionId) {
        // If the last Section was the one that was opened Open it
        option = { collapsed: false };
    } else {
        option = { collapsed: true };
    }

    collapsibleContent_TRACKsLsCollapsibleScreen(element, contentItem, SectionName, option);
};
myapp.TRACKsLsCollapsibleScreen.NestedElements_render = function (element, contentItem) {
    // Get the Id of the TRACK
    var intTRACKId = contentItem.value;
    // Save values for reload later
    _intTRACKId.splice(groupCounter, 0, intTRACKId);
    _element.splice(groupCounter, 0, element);
    // Increase groupCounter
    groupCounter = groupCounter + 1;
    // Load 
    getElementsForSection_TRACKsLsCollapsibleScreen(intTRACKId, element);
};
function collapsibleContent_TRACKsLsCollapsibleScreen(element, contentItem, groupTitle, options) {
    // From:
    // jQuery Mobile Collapsible Content Control with LightSwitch	
    // http://jewellambert.com/jquery-mobile-collapsible-content-control-with-lightswitch/
    // Jewel Lambert - @dotnetlore

    // provide some defaults for the optional 'options' parameter
    var defaults = { dataTheme: 'b', contentTheme: 'b', collapsed: false };
    options = $.extend({}, defaults, options);

    // create a header based on the displayName of the bound content
    var h1 = $('<h1>').text(groupTitle);

    $(element).prepend(h1);

    // build the <div> for the jQM collapsible content control
    var DIV = $('<div data-role=collapsible data-theme=a data-collapsed=' + options.collapsed + ' />');

    // wrap the existing children with this div
    $(element).children().wrapAll(DIV);

    // tell jQM to render the new <div>
    DIV.trigger('create');
}
function getElementsForSection_TRACKsLsCollapsibleScreen(TRACKId, element) {
    // clear element
    $(element).empty();

    // Get Elements
    var Int32 = ':Int32';
    var filter = '(TRACK/Id eq ' + msls._toODataString(TRACKId, Int32) + ')';
    msls.showProgress(myapp.activeDataWorkspace.ApplicationData.TRACK_FORM_FIELDs
    .filter(filter)
    .execute()
    .then(function (result) {

        // Make an array of buttons
        var objButton = new Array();
        // Create a JQuery Mobile container
        var objFieldcontain = $('<div data-role=fieldcontain />');
        var objFieldset = $('<fieldset data-role=controlgroup />');
        objFieldset.appendTo($(objFieldcontain));
        var CustomUl = $('<ul class=msls-listview ui-listview data-role=listview data-inset=false></ul>');
        CustomUl.appendTo($(objFieldset));

        // Loop through each page
        var index = 0;
        var Entities = result.results;
        Entities.forEach(function (entity) {
            index = index + 1;
            // Create Button text

            // Get Summary Property
            var entityType = entity.details.getModel();
            var summaryAttribute = getAttributeForEntity_TRACKsLsCollapsibleScreen(entityType, ':@SummaryProperty');
            var SummaryProperty = summaryAttribute.property.name;

            var shortText = eval('entity.' + SummaryProperty);

            // Trim text if it is long
            if (shortText.length > 200) {
                shortText = jQuery.trim(shortText)
                    .substring(0, 200).split(' ').slice(0, -1).join(' ') + '...';
            }

            var CustomDiv = '<li tabindex=0 data-msls=true ';

            CustomDiv = CustomDiv + 'onclick=editTRACK_FORM_FIELDs_TRACKsLsCollapsibleScreen(' + entity.Id + ',' + TRACKId + '); ';
            CustomDiv = CustomDiv + 'return=false rel=external';
            CustomDiv = CustomDiv + '>';

            CustomDiv = CustomDiv + '<div class=msls-text-container>';
            CustomDiv = CustomDiv + '<label class=msls-label-text>' + shortText + '</label>';
            CustomDiv = CustomDiv + '</div>';

            CustomDiv = CustomDiv + '</div>';
            CustomDiv = CustomDiv + '<div class=msls-clear></div>';

            CustomDiv = CustomDiv + '</li>';

            // Create the Button
            objButton[index] = $(CustomDiv);

            // Add Div to the CustomUl
            objButton[index].appendTo($(CustomUl));
        })

        // Add contaner to the element
        objFieldset.appendTo($(element));
        // Tell JQuery Mobile to render
        objFieldset.trigger('create');
    }))
};
function editTRACK_FORM_FIELDs_TRACKsLsCollapsibleScreen(entityId, TRACKId ) {
    // Create a filter
    var int32 = ':Int32';
    var filter = '(Id eq ' + msls._toODataString(entityId, int32) + ')';
    // Use filter in query to get the page
    myapp.activeDataWorkspace.ApplicationData.TRACK_FORM_FIELDs
        .filter(filter)
        .execute()
        .then(function (result) {
            SelectedEntity = result.results[0];
            _screen.TRACK_FORM_FIELD = SelectedEntity;
            _screen.showPopup('TRACK_FORM_FIELDPopup');
        });
};
// TRACKs

myapp.TRACKsLsCollapsibleScreen.SaveDataMain_execute = function (screen) {
    SaveMainChanges_TRACKsLsCollapsibleScreen();
};
myapp.TRACKsLsCollapsibleScreen.AddMainData_execute = function (screen) {
    // Create A New Record
    screen.TRACK = new myapp.TRACK();
    screen.showPopup('TRACKPopup');
};
myapp.TRACKsLsCollapsibleScreen.DeleteDataMain_execute = function (screen) {
    // Delete
    screen.TRACK.deleteEntity();
    SaveMainChanges_TRACKsLsCollapsibleScreen();
};
myapp.TRACKsLsCollapsibleScreen.EditMainData_execute = function (screen) {
    // Show the Popup
    screen.TRACK = screen.TRACKs.selectedItem;
    screen.showPopup('TRACKPopup');
};
// TRACK_FORM_FIELDs

myapp.TRACKsLsCollapsibleScreen.SaveData_execute = function (screen) {
    SaveChanges_TRACKsLsCollapsibleScreen();
};
myapp.TRACKsLsCollapsibleScreen.AddData_execute = function (screen) {
    // Create A New Record
    SelectedEntity = new myapp.TRACK_FORM_FIELD();
    SelectedEntity.setTRACK(screen.TRACKs.selectedItem);
    _screen.TRACK_FORM_FIELD = SelectedEntity;
    _screen.showPopup('TRACK_FORM_FIELDPopup');
};
myapp.TRACKsLsCollapsibleScreen.DeleteData_execute = function (screen) {
    // Delete
    SelectedEntity.deleteEntity();
    SaveChanges_TRACKsLsCollapsibleScreen();
};
myapp.TRACKsLsCollapsibleScreen.CancelData_execute = function (screen) {
    // Discard Changes
    screen.details.dataWorkspace.ApplicationData.details.discardChanges();
    // Close Popup
    _screen.closePopup();
};
// Save

function SaveMainChanges_TRACKsLsCollapsibleScreen() {
    // Save changes
    myapp.applyChanges().then(function () {
        // Close Popup
        _screen.closePopup();
        // Reload
        _screen.TRACKs.load();
    }, function fail(e) {
        // Show the error.
        msls.showMessageBox(e.message, { title: 'Error' }).then(function () {
            // Cancel Changes
            myapp.cancelChanges();
            // Close Popup
            _screen.closePopup();
            // Reload
            _screen.TRACKs.load();
        });
    });
}
function SaveChanges_TRACKsLsCollapsibleScreen() {
    // Save changes
    myapp.applyChanges().then(function () {
        // Close Popup
        _screen.closePopup();
        // Load all sections
        for (var i = 0; i < groupCounter; i++) {
            // Load the Section 
            getElementsForSection_TRACKsLsCollapsibleScreen(_intTRACKId[i], _element[i]);
        }
    }, function fail(e) {
        // Show the error.
        msls.showMessageBox(e, { title: 'Error' }).then(function () {
            // Discard Changes
            screen.details.dataWorkspace.ApplicationData.details.discardChanges();
        });
    });
}
// Utility

function getAttributeForEntity_TRACKsLsCollapsibleScreen(item, classId) {

    var att = null,
        s = null;
    if (item) {
        att = item[classId];
        if (att) {
            if ($.isArray(att)) {
                if (att.length > 0) {
                    s = att[0];
                }
            } else {
                s = att;
            }
        }
    }
    return s;
};