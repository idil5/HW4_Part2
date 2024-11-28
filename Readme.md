Name: Idil Hassan
ID: 02110597


# Part 2: Implementing jQuery UI Slider and Tab Widgets

## **Introduction**
Part 2 extends the functionality of Part 1 by adding dynamic user interaction features using jQuery UI. The assignment implements sliders for input fields and a tabbed interface for saving and managing generated tables.

---

## **Features Implemented**
1. **Two-Way Binding with jQuery UI Sliders**:
   - Sliders for each input field (`minColumnValue`, `maxColumnValue`, `minRowValue`, `maxRowValue`).
     - Moving a slider updates the text field instantly.
     - Editing the text field updates the slider position dynamically.

2. **Dynamic Table Updates**:
   - The multiplication table updates automatically when the sliders are moved or text fields are changed and the generate button is clicked.
   - Form validation prevents the table from being generated with invalid inputs.

3. **Tabbed Interface with jQuery UI Tabs**:
   - Tabs are created below each time the "Generate Table" button is clicked and if the validation is sucessful.
   - Tabs are labeled with the parameters used to generate the table (e.g., "Cols: -3 to 3, Rows: 1 to 5").
   - To view the tables of the saved tabs the user must click on it
   - Individual tabs can be closed by clicking the close button (`×`) on each tab.


## **How to Use**
   - Adjust values using sliders or type directly into the text fields.
   - Ensure values are within the range `-50` to `50`.
   - Click the "Generate Table" button to create a multiplication table
   - It will be saved in the "Saved Tables" section thats below the multiplcation table
   - Switch between tabs to view saved tables.
   - Close tabs by clicking the `×` button.

   
# Resources
https://www.w3schools.com/jquery/default.asp

