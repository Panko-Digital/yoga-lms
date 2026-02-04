/* Progress Bar Module 1 - Scoped JavaScript */
/* Auto-initializes on page load if element exists */

(function () {
    'use strict';

    // Module 1 lesson data
    var module1Lessons = [
        { short: "Why", full: "Why Anatomy?" },
        { short: "Locations", full: "Locations of Structures on the Body" },
        { short: "Pose", full: "Pose with Movements" },
        { short: "Positions", full: "Positions and Curvatures of the Spine and Pelvis" },
        { short: "Bone", full: "Structure of Bone Tissue" },
        { short: "Skeleton", full: "The Axial and Appendicular Skeletons" },
        { short: "Joints", full: "Joints in the Skeletal System" },
        { short: "Variable", full: "Variable Anatomy" },
        { short: "Tissue", full: "Types of Tissue" },
        { short: "Stretching", full: "Physiology of Stretching" },
        { short: "Pelvis", full: "Anatomy of the Pelvis, Shoulder Girdle and Trunk" },
        { short: "Tadasana", full: "Tadasana Alignment" },
        { short: "Energy", full: "Muscular and Organic Energy" },
        { short: "Principles", full: "Principles of Forward Folding, Back-Bending, Lateral Bending and Twisting" },
        { short: "History", full: "History of Yoga" }
    ];

    function createProgressBar(container, lessons, currentStep) {
        var totalSteps = lessons.length;

        // Calculate progress percentages
        // previousProgress: where the line starts (already filled, no animation)
        // currentProgress: where the line ends (animated segment)
        var previousProgress = currentStep > 1 ? ((currentStep - 2) / (totalSteps - 1)) * 100 : 0;
        var currentProgress = ((currentStep - 1) / (totalSteps - 1)) * 100;

        // The animated segment width (just one step)
        var segmentWidth = currentStep > 1 ? (1 / (totalSteps - 1)) * 100 : 0;

        var stepsHtml = lessons.map(function (lesson, i) {
            var stepNum = i + 1;
            var isCompleted = stepNum < currentStep;
            var isActive = stepNum === currentStep;
            var isLastCompleted = stepNum === currentStep - 1; // The one that just got completed

            var circleClass = 'ylms-pb_circle';
            if (isCompleted) circleClass += ' ylms-pb_completed';
            else if (isActive) circleClass += ' ylms-pb_active';

            var labelClass = 'ylms-pb_label';
            if (stepNum <= currentStep) labelClass += ' ylms-pb_active';

            var circleContent;
            if (isCompleted) {
                // Only animate the tick for the last completed step
                var tickClass = isLastCompleted ? 'ylms-pb_tick ylms-pb_tick-animate' : 'ylms-pb_tick';
                circleContent = '<span class="' + tickClass + '">✓</span>';
            } else {
                circleContent = stepNum;
            }

            return '<div class="ylms-pb_step">' +
                '<div class="' + circleClass + '" title="' + lesson.full + '">' + circleContent + '</div>' +
                '<span class="' + labelClass + '">' + lesson.short + '</span>' +
                '</div>';
        }).join('');

        var rightClass = currentStep > totalSteps ? 'ylms-pb_right ylms-pb_complete' : 'ylms-pb_right';

        container.innerHTML =
            '<div class="ylms-pb_wrapper" style="--ylms-pb-previous: ' + previousProgress + '; --ylms-pb-segment: ' + segmentWidth + '">' +
            '<div class="ylms-pb_track"></div>' +
            '<div class="ylms-pb_left"></div>' +
            '<div class="ylms-pb_fill-static"></div>' +
            '<div class="ylms-pb_fill-animated"></div>' +
            '<div class="' + rightClass + '"></div>' +
            '<div class="ylms-pb_steps-container">' +
            '<div class="ylms-pb_steps">' +
            stepsHtml +
            '</div>' +
            '</div>' +
            '</div>';
    }

    function init() {
        // Look for Module 1 progress bar container
        var container = document.getElementById('ylms-module1-progress');
        // console.log('[YLMS-PB] init() called');

        if (!container) {
            console.log('[YLMS-PB] Container #ylms-module1-progress not found');
            return;
        }

        // console.log('[YLMS-PB] Container found:', container);

        // Read current step from data attribute
        var currentStep = container.dataset.step ? parseInt(container.dataset.step, 10) : 1;

        // console.log('[YLMS-PB] Config - step:', currentStep);

        createProgressBar(container, module1Lessons, currentStep);
        // console.log('[YLMS-PB] Progress bar created');
    }

    // Run with small delay to ensure DOM is fully ready
    // console.log('[YLMS-PB] Script loaded, scheduling init...');
    setTimeout(init, 250);

})();
