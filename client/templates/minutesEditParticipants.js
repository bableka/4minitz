import { Minutes } from '/imports/minutes'

let _minutesID; // the ID of these minutes

let isEditable = function () {
    let min = new Minutes(_minutesID);
    return min.isCurrentUserModerator() && !min.isFinalized;
};

Template.minutesEditParticipants.onCreated(function() {
    _minutesID = this.data._id;
    console.log("Template minutesEditParticipants created with minutesID "+_minutesID);
});

Template.minutesEditParticipants.onRendered(function() {
    $.material.init()
});



Template.minutesEditParticipants.helpers({
    userName(userId) {
        return Meteor.users.findOne(userId).username;
    },


    checkedStatePresent() {
        if (this.present) {
            return {checked: "checked"};
        }
        return {};
    },

    disabledStatePresent: function () {
        if (isEditable()) {
            return "";
        } else {
            return {disabled: "disabled"};
        }
    }
});


Template.minutesEditParticipants.events({
    "click #btnTogglePresent": function (evt, tmpl) {
        let min = new Minutes(_minutesID);
        let indexInParticipantsArray = evt.target.dataset.index;
        let checkedState = evt.target.checked;
        min.updateParticipantPresent(indexInParticipantsArray, checkedState);
    }
});
