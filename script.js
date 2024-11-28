$(document).ready(function () {
    $("#tabs").tabs();

    // Keep track of the number of tabs
    let tabCounter = 0;

    $("#tableForm").validate({
        rules: {
            minColumnValue: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxColumnValue: {
                required: true,
                number: true,
                range: [-50, 50],
                greaterThan: "#minColumnValue"
            },
            minRowValue: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            maxRowValue: {
                required: true,
                number: true,
                range: [-50, 50],
                greaterThan: "#minRowValue"
            }
        },
        messages: {
            minColumnValue: {
                required: "Please enter a value for Min Column.",
                number: "Must be a valid number.",
                range: "Must be between -50 and 50."
            },
            maxColumnValue: {
                required: "Please enter a value for Max Column.",
                number: "Must be a valid number.",
                range: "Must be between -50 and 50.",
                greaterThan: "Max Column must be greater than or equal to Min Column."
            },
        minRowValue: {
            required: "Please enter a value for Min Row.",
            number: "Must be a valid number.",
            range: "Must be between -50 and 50."
        },
        maxRowValue: {
            required: "Please enter a value for Max Row.",
            number: "Must be a valid number.",
            range: "Must be between -50 and 50.",
            greaterThan: "Max Row must be greater than or equal to Min Row."
        }        },
        errorPlacement: function (error, element) {
            error.insertAfter(element); // Puts the error right below the input field
        }
    });

    // Custom Validation Method
    $.validator.addMethod("greaterThan", function (value, element, param) {
        return parseInt(value) >= parseInt($(param).val());
    }, "This value must be greater than or equal to the other field.");

    // Slider Initialization
    const setupSlider = (sliderId, inputId) => {
        $(sliderId).slider({
            min: -50,
            max: 50,
            value: parseInt($(inputId).val()) || 0,
            slide: function (event, ui) {
                $(inputId).val(ui.value);
                generateTable(); // Automatically update table
            }
        });

        $(inputId).on("input", function () {
            const value = parseInt($(this).val());
            if (!isNaN(value) && value >= -50 && value <= 50) {
                $(sliderId).slider("value", value);
                generateTable(); // Automatically update table
            }
        });
    };

    // Set up sliders
    setupSlider("#slider-minColumnValue", "#minColumnValue");
    setupSlider("#slider-maxColumnValue", "#maxColumnValue");
    setupSlider("#slider-minRowValue", "#minRowValue");
    setupSlider("#slider-maxRowValue", "#maxRowValue");

    
// Store saved table data in an object
let savedTables = {};

function addNewTab(label, tableData) {
    // Unique ID for the tab
    const tabId = `tab-${Date.now()}`;

    // Save the table data
    savedTables[tabId] = tableData;

    // Add the tab label and close button
    $("#tabs ul").append(
        `<li>
            <a href="#${tabId}" class="tab-link" data-tab-id="${tabId}">${label}</a>
            <button class="close-tab" data-tab-id="${tabId}">×</button>
        </li>`
    );

    $("#tabs").tabs("refresh"); //Update tabs
}

// Handle tab click to load saved table
$("#tabs").on("click", ".tab-link", function (e) {
    e.preventDefault(); // Prevent default action for the anchor link

    const tabId = $(this).data("tab-id"); // Retrieve the tab ID
    const tableData = savedTables[tabId]; // Get the saved table data for the clicked tab

    if (tableData) {
        // Replace the content in the main table container with the saved table
        $("#tableContainer").html(tableData);
    } else {
        console.error("No table data found for the clicked tab.");
    }
});


// Handle tab close
$("#tabs").on("click", ".close-tab", function (e) {
    e.stopPropagation(); // Prevent triggering the tab click
    const tabId = $(this).data("tab-id");

    // Remove the tab and saved table data
    $(this).closest("li").remove();
    delete savedTables[tabId];

    $("#tabs").tabs("refresh");
});


    // Handle tab close button click
    $("#tabs").on("click", ".close-tab", function () {
        const tabId = $(this).data("tab"); // Get the tab ID
        $(this).closest("li").remove(); // Remove the tab label
        $(`#${tabId}`).remove(); // Remove the tab content
        $("#tabs").tabs("refresh"); // Updates the tab widget to include the new tab
    });

    // Generate the table
    function generateTable(createTab = false) {
        const minColumn = parseInt($("#minColumnValue").val());
        const maxColumn = parseInt($("#maxColumnValue").val());
        const minRow = parseInt($("#minRowValue").val());
        const maxRow = parseInt($("#maxRowValue").val());

        // Clear error messages
        $("#errorContainer").hide().text("");

        // Validation checks
        if ($("#tableForm").valid() === false) {
            return; // Stop if validation fails
        }

        // Generate table content
        let table = "<table class='table table-bordered'><tr><th></th>";
        for (let col = minColumn; col <= maxColumn; col++) {
            table += `<th>${col}</th>`;
        }
        table += "</tr>";

        for (let row = minRow; row <= maxRow; row++) {
            table += `<tr><th>${row}</th>`;
            for (let col = minColumn; col <= maxColumn; col++) {
                table += `<td>${row * col}</td>`;
            }
            table += "</tr>";
        }
        table += "</table>";

        // Update the main table
        $("#tableContainer").html(table);

        // Add a new tab when triggered by form submission
        if (createTab) {
            const label = `Cols: ${minColumn}-${maxColumn}, Rows: ${minRow}-${maxRow}`;
            addNewTab(label, table);
        }
    }
   
    // Trigger table generation on form submit
    $("#tableForm").on("submit", function (e) {
        e.preventDefault(); // Prevent page reload
        generateTable(true); // Generate table and create a tab
    });

    // Initial table generation
    generateTable();
});
