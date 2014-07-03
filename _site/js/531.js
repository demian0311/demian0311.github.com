/*
Copyright (c) 2014 Demian Neidetcher

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

-- http://opensource.org/licenses/MIT
*/

jQuery(function(){

    // Add listeners
    jQuery.each(["press", "dead", "bench", "squat"], function(cei, currExercise){
        jQuery('#' + currExercise + ' .max').change(function(){calculate531ForExercise(currExercise);});

        jQuery.each([1, 2, 3, 4], function(cai, currAssistance){
            jQuery.each(["sets", "reps", "weight"], function(cci, currComponent){
                jQuery('#' + currExercise + ' .assistance' + currAssistance + ' .' + currComponent + ':first').change(function(){
                    PrefillAssitance(currExercise, currAssistance, currComponent);
                });
            });
        });
    });

    // validation for number fields
    jQuery("input.validNumber").change(function(event){ validateNumber(event.target); });
});

var multiplierMatrix = [
    //       Week
    // 1    2    3    4   // set
    //--------------------// ---
    [.65, .70, .75, .40], //   1
    [.75, .80, .85, .50], //   2
    [.85, .90, .95, .60]  //   3
]

function validateNumber(eventTarget){
    if(new Number(event.target.value) > 0) {
        eventTarget.classList.remove("invalid");
    } else {
        eventTarget.classList.add("invalid");
    };
}

// seems i should pass in the element here and walk the dom hierarchy from there
function calculate531ForExercise(exerciseName){
    var max = jQuery("#" + exerciseName + " .max")[0].value;
    for(currWeek = 1; currWeek <= 4; currWeek ++){
        for(currSet = 1; currSet <= 3; currSet++){
            var currRawValue = Math.ceil(multiplierMatrix[currSet -1][currWeek -1] * max);
            var currValue = currRawValue - (currRawValue % 5);
            jQuery("#" + exerciseName + " .set" + currSet + " .week" + currWeek).html(currValue);
        }
    }
}

function PrefillAssitance(exerciseName, exerciseNumber, component){
    var valueToCopy = null;
    jQuery("#" + exerciseName + " .assistance" + exerciseNumber + " ." + component).each(function(index, element){
            if(index == 0){
                valueToCopy = element.value
            } else {
                element.value = valueToCopy;
                validateNumber(element);
            }
        }
    );

    if(exerciseNumber < 4){
        jQuery('#' + exerciseName + " .assistance" + (exerciseNumber + 1)).show("slow");
    }
}
