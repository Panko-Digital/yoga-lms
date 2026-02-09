/* Progress Bar Module 1 - Scoped JavaScript */
/* Auto-initializes on page load if element exists */

(function () {
    'use strict';

    // Module 1 lesson data - substeps will be set dynamically from panels on the page
    var module1Lessons = [
        { short: "Why Anatomy", full: "Why Anatomy?" },
        { short: "Locations", full: "Locations of Structures on the Body" },
        { short: "Pose", full: "Pose with Movements" },
        { short: "Positions", full: "Positions and Curvatures of the Spine and Pelvis" },
        { short: "Bone Tisue", full: "Structure of Bone Tissue" },
        { short: "Skeleton", full: "The Axial and Appendicular Skeletons" },
        { short: "Joints", full: "Joints in the Skeletal System" },
        { short: "Variable", full: "Variable Anatomy" },
        { short: "Tissue Types", full: "Types of Tissue" },
        { short: "Stretching", full: "Physiology of Stretching" },
        { short: "Anatomy", full: "Anatomy of the Pelvis, Shoulder Girdle and Trunk" },
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

        // Only animate if on substep 1 (just arrived at this step)
        var shouldAnimate = currentSubstep <= 1;

        // Calculate progress percentages
        var previousProgress, segmentWidth;
        if (shouldAnimate) {
            // Animate: static fill up to previous step, animated segment for current
            previousProgress = currentStep > 1 ? ((currentStep - 2) / (totalSteps - 1)) * 100 : 0;
            segmentWidth = currentStep > 1 ? (1 / (totalSteps - 1)) * 100 : 0;
        } else {
            // No animation: static fill all the way to current step
            previousProgress = ((currentStep - 1) / (totalSteps - 1)) * 100;
            segmentWidth = 0;
        }

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
                // Only animate tick on substep 1
                var tickClass = (isLastCompleted && shouldAnimate) ? 'ylms-pb_tick ylms-pb_tick-animate' : 'ylms-pb_tick';
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

        // Calculate actual content width in pixels for reliable animation
        var wrapperStyle = '--ylms-pb-previous: ' + previousProgress + '; --ylms-pb-segment: ' + segmentWidth + '; --ylms-pb-current: ' + (previousProgress + segmentWidth);

        container.innerHTML =
            '<div class="ylms-pb_wrapper">' +
            '<div class="ylms-pb_steps-container" style="--ylms-pb-previous: ' + previousProgress + '; --ylms-pb-current: ' + (previousProgress + segmentWidth) + '">' +
            '<div class="ylms-pb_track"></div>' +
            '<div class="ylms-pb_left"></div>' +
            '<div class="ylms-pb_fill-static"></div>' +
            (shouldAnimate ? '<div class="ylms-pb_fill-animated"></div>' : '') +
            '<div class="' + rightClass + '"></div>' +
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
                tab.label +
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

    function calculateReadTime() {
        var WORDS_PER_MIN = 200;
        var SECS_PER_IMAGE = 10;
        var MINS_PER_IFRAME = 5;

        // Scope to .user_content container (LMS course content area)
        var contentEl = document.querySelector('.user_content');
        if (!contentEl) return 0;

        // Count words from text content
        var textContent = contentEl.textContent || '';
        var words = textContent.trim().split(/\s+/).filter(function (w) { return w.length > 0; }).length;
        var readMins = words / WORDS_PER_MIN;

        // Count images
        var imageCount = contentEl.querySelectorAll('img').length;
        var imageMins = (imageCount * SECS_PER_IMAGE) / 60;

        // Sum video durations from data-duration attributes (in seconds)
        var videoMins = 0;
        contentEl.querySelectorAll('[data-duration]').forEach(function (el) {
            videoMins += (parseInt(el.dataset.duration, 10) || 0) / 60;
        });

        // Count iframes (interactive exercises) - 5 min each
        var iframeCount = contentEl.querySelectorAll('iframe').length;
        var iframeMins = iframeCount * MINS_PER_IFRAME;

        var totalMins = Math.ceil(readMins + imageMins + videoMins + iframeMins);
        if (totalMins < 1) totalMins = 1;

        return totalMins;
    }

    function renderReadTime(container) {
        var mins = calculateReadTime();
        var badge = document.createElement('div');
        badge.className = 'ylms-pb_readtime';
        badge.textContent = mins + ' min';
        container.after(badge);
    }

    function parseProgress(value) {
        // Format: "step" or "step-substepCount-activeSubstep"
        // e.g. "4" = step 4, no substeps
        // e.g. "4-3-1" = step 4, 3 substeps, active substep 1
        if (!value) return { step: 1, substepCount: 1, substep: 1 };
        var parts = value.split('-').map(function (p) { return parseInt(p, 10); });
        return {
            step: parts[0] || 1,
            substepCount: parts[1] || 1,
            substep: parts[2] || 1
        };
    }

    function init() {
        var container = document.getElementById('ylms-module1-progress');

        if (!container) {
            console.log('[YLMS-PB] Container #ylms-module1-progress not found');
            return;
        }

        // Parse data-progress attribute (format: "step-substepCount-activeSubstep")
        var progress = parseProgress(container.dataset.progress);
        currentState.step = progress.step;
        currentState.substep = progress.substep;

        // Set substep count on the current step's lesson
        var currentLesson = module1Lessons[currentState.step - 1];
        if (currentLesson && progress.substepCount > 1) {
            currentLesson.substeps = progress.substepCount;
        }

        // Create tabs from panels if they exist (overrides substep count)
        createTabsFromPanels(container);

        // If no tabs were created, just render progress bar
        if (!document.querySelector('.ylms-tb_container')) {
            createProgressBar(container, module1Lessons, currentState.step, currentState.substep);
        }

        // Expose update function globally for tab integration
        window.ylmsUpdateSubstep = updateSubsteps;

        // Render read time indicator
        renderReadTime(container);
    }

    setTimeout(init, 250);

})();
