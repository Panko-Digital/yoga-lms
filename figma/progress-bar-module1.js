/* Progress Bar Module 1 - Scoped JavaScript */
/* Auto-initializes on page load if element exists */

(function () {
    'use strict';

    // Module 1 lesson data - substeps will be set dynamically from panels on the page
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

    // Store reference to update substeps externally
    var currentState = {
        step: 1,
        substep: 1
    };

    function createSubstepDots(count, activeSubstep, isActiveStep, isCompleted) {
        if (count <= 1) return '';

        var dots = [];
        for (var i = 1; i <= count; i++) {
            var dotClass = 'ylms-pb_substep';
            if (isCompleted) {
                // All dots filled for completed steps
                dotClass += ' ylms-pb_substep-completed';
            } else if (isActiveStep) {
                // Fill all dots up to and including the active substep
                if (i <= activeSubstep) {
                    dotClass += ' ylms-pb_substep-completed';
                }
            }
            dots.push('<span class="' + dotClass + '"></span>');
        }
        return '<div class="ylms-pb_substeps">' + dots.join('') + '</div>';
    }

    function createProgressBar(container, lessons, currentStep, currentSubstep) {
        var totalSteps = lessons.length;

        // Calculate progress percentages
        var previousProgress = currentStep > 1 ? ((currentStep - 2) / (totalSteps - 1)) * 100 : 0;
        var segmentWidth = currentStep > 1 ? (1 / (totalSteps - 1)) * 100 : 0;

        var stepsHtml = lessons.map(function (lesson, i) {
            var stepNum = i + 1;
            var isCompleted = stepNum < currentStep;
            var isActive = stepNum === currentStep;
            var isLastCompleted = stepNum === currentStep - 1;

            var circleClass = 'ylms-pb_circle';
            if (isCompleted) circleClass += ' ylms-pb_completed';
            else if (isActive) circleClass += ' ylms-pb_active';

            var labelClass = 'ylms-pb_label';
            if (stepNum <= currentStep) labelClass += ' ylms-pb_active';

            var circleContent;
            if (isCompleted) {
                var tickClass = isLastCompleted ? 'ylms-pb_tick ylms-pb_tick-animate' : 'ylms-pb_tick';
                circleContent = '<span class="' + tickClass + '">✓</span>';
            } else {
                circleContent = stepNum;
            }

            var substepDots = createSubstepDots(
                lesson.substeps || 1,
                isActive ? currentSubstep : 1,
                isActive,
                isCompleted
            );

            return '<div class="ylms-pb_step" data-step="' + stepNum + '">' +
                '<div class="' + circleClass + '" title="' + lesson.full + '">' + circleContent + '</div>' +
                '<span class="' + labelClass + '">' + lesson.short + '</span>' +
                substepDots +
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

    function updateSubsteps(substep) {
        currentState.substep = substep;
        var container = document.getElementById('ylms-module1-progress');
        if (container) {
            // Find the active step's substep dots
            var activeStep = container.querySelector('.ylms-pb_step[data-step="' + currentState.step + '"]');
            if (activeStep) {
                var dots = activeStep.querySelectorAll('.ylms-pb_substep');
                dots.forEach(function (dot, i) {
                    var dotIndex = i + 1;
                    dot.classList.remove('ylms-pb_substep-completed', 'ylms-pb_substep-active');
                    // Fill all dots up to and including the active substep
                    if (dotIndex <= substep) {
                        dot.classList.add('ylms-pb_substep-completed');
                    }
                });
            }
        }
    }

    function createTabsFromPanels(container) {
        // Find all panels with data-panel attribute
        var panels = document.querySelectorAll('[data-panel]');
        if (panels.length === 0) return;

        // Extract tab data from panels
        var tabData = [];
        panels.forEach(function (panel, index) {
            var panelId = panel.dataset.panel || (index + 1);
            // Find first heading (h1, h2, h3, or h4)
            var heading = panel.querySelector('h1, h2, h3, h4');
            var label = heading ? heading.textContent.trim() : 'Tab ' + (index + 1);
            tabData.push({ id: panelId, label: label });

            // Add panel class and hide non-first panels
            panel.classList.add('ylms-tb_panel');
            if (index === 0) {
                panel.classList.add('ylms-tb_active');
            }
        });

        if (tabData.length <= 1) return; // No tabs needed for single panel

        // Create tabs HTML
        var tabsHtml = tabData.map(function (tab, index) {
            var activeClass = index === 0 ? ' ylms-tb_active' : '';
            return '<button class="ylms-tb_tab' + activeClass + '" data-tab="' + tab.id + '">' +
                (index + 1) + ' ' + tab.label +
                '</button>';
        }).join('');

        // Create tab container
        var tabContainer = document.createElement('div');
        tabContainer.className = 'ylms-tb_container';
        tabContainer.innerHTML = '<div class="ylms-tb_tabs">' + tabsHtml + '</div>';

        // Wrap panels in a panels container
        var panelsContainer = document.createElement('div');
        panelsContainer.className = 'ylms-tb_panels';
        panels.forEach(function (panel) {
            panelsContainer.appendChild(panel);
        });

        // Insert after the progress bar
        container.after(tabContainer);
        tabContainer.after(panelsContainer);

        // Add click handlers
        var tabs = tabContainer.querySelectorAll('.ylms-tb_tab');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var tabId = this.dataset.tab;
                var tabIndex = Array.from(tabs).indexOf(this) + 1;

                // Update tab active states
                tabs.forEach(function (t) { t.classList.remove('ylms-tb_active'); });
                this.classList.add('ylms-tb_active');

                // Update panel visibility
                panels.forEach(function (p) { p.classList.remove('ylms-tb_active'); });
                var targetPanel = document.querySelector('[data-panel="' + tabId + '"]');
                if (targetPanel) targetPanel.classList.add('ylms-tb_active');

                // Update progress bar substeps
                updateSubsteps(tabIndex);
            });
        });

        // Update substeps count for current step based on panel count
        var currentLesson = module1Lessons[currentState.step - 1];
        if (currentLesson) {
            currentLesson.substeps = tabData.length;
        }

        // Re-render progress bar with correct substep count
        createProgressBar(container, module1Lessons, currentState.step, currentState.substep);
    }

    function init() {
        var container = document.getElementById('ylms-module1-progress');

        if (!container) {
            console.log('[YLMS-PB] Container #ylms-module1-progress not found');
            return;
        }

        // Read current step and substep from data attributes
        currentState.step = container.dataset.step ? parseInt(container.dataset.step, 10) : 1;
        currentState.substep = container.dataset.substep ? parseInt(container.dataset.substep, 10) : 1;

        // Create tabs from panels first (updates substep count)
        createTabsFromPanels(container);

        // If no panels found, just render progress bar
        if (!document.querySelector('.ylms-tb_container')) {
            createProgressBar(container, module1Lessons, currentState.step, currentState.substep);
        }

        // Expose update function globally for tab integration
        window.ylmsUpdateSubstep = updateSubsteps;

        // Also expose lesson data for tab generation
        window.ylmsGetCurrentStepSubsteps = function () {
            var lesson = module1Lessons[currentState.step - 1];
            return lesson ? lesson.substeps || 1 : 1;
        };
    }

    setTimeout(init, 250);

})();
