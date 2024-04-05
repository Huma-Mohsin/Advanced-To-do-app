#! /usr/bin/node env
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.redBright("Task Management App"));

let todos_list: string[] = [];

let condition = true;

while (condition) {
  //inquirer-1(for user's choice)
  const user_choice = await inquirer.prompt({
    name: "asking_users_choice",
    type: "list",
    message: chalk.yellowBright("What do you want to do?"),
    choices: [
      "To Add Task",
      "To View Task",
      "To Update Task",
      "To Delete Task",
    ],//H/w By sir Ameen and Miss Mannal
  });
  //----------------------------------------------------------------------------------------------------
  //inquirer-2 (for Add something in a list)

  if (user_choice.asking_users_choice === "To Add Task") {
    let user_add = await inquirer.prompt({
      name: "ask_to_add",
      type: "input",
      message:chalk.green ("What Do You Want TO Add in Checklist?"),
      validate: function(value) { //Homework by Sir bilal,if an empty data is inserted in a todolist that what happened?
        if (value.trim() === "") {
            return "Please enter a valid task."; // Prompt user if the input is empty
        }
        return true;
    }
    });
    if (user_add.ask_to_add.trim() !== "") {
        // Check again to ensure empty data is not added
        todos_list.push(user_add.ask_to_add);
        console.log(chalk.blueBright("Task added successfully."));
    } else {
        console.log(chalk.red("Invalid input. Task not added."));
    }


  } //closing of user_add if.
  //-----------------------------------------------------------------------------------------------------

  //(for view task):-
  if (user_choice.asking_users_choice === "To View Task") {
    console.log(chalk.greenBright.bgGrey("Your Added Tasks Are:-"));
    console.log(chalk.blueBright(todos_list));
  } //closing of view task if.
  //-------------------------------------------------------------------------------------------------------
  //inquirer-3a (for update task)
  if (user_choice.asking_users_choice === "To Update Task") {
    // This line prompts the user to select the task they want to update from the todos_list array. The selected task is stored in the updateItem property of the user_update_items object.

    let user_update_items = await inquirer.prompt({
      name: "updateItem",
      type: "list",
      message: chalk.red("What Task Do You Want To Update?"),
      choices: todos_list,
    });
    //inquirer-3b
    let user_updated_Value = await inquirer.prompt({
      //This line prompts the user to enter the updated value for the selected task. The user's input is stored in the updatedValue property of the user_updated_Value object.
      type: "input",
      name: "updatedValue",
      message:
        chalk.yellowBright("Enter the updated value for '" + user_update_items.updateItem + "':"), //The message displayed to the user includes the name of the task they want to update, followed by a colon to indicate where the user should input their updated value.
    });

    const index = todos_list.indexOf(user_update_items.updateItem); //This line finds the index of the selected task (updateItem) in the todos_list array. The index is stored in the index variable.

    if (index !== -1) {
      //This line checks if the selected task was found in the todos_list array. If the task was found (index !== -1), the code inside the curly braces will execute.

      todos_list[index] = user_updated_Value.updatedValue; // This line updates the task at the found index (index) in the todos_list array with the new value entered by the user (user_updated_Value.updatedValue).
      console.log(chalk.green("Todo item updated successfully."));
      console.log(chalk.red(todos_list));
    } else {
      console.log(chalk.red("Item not found in the list."));
    }
  }
  //--------------------------------------------------------------------------------------------------------

  //inquirer-4 (for delete task)

  if (user_choice.asking_users_choice === "To Delete Task") {
    let user_delete = await inquirer.prompt({
      type: "list",
      name: "index",
      message:chalk.green( "Select the item you want to delete:"),
      choices: todos_list,
    });

    const indexToRemove = todos_list.indexOf(user_delete.index); //Here, user_delete.index represents the item selected by the user for deletion. We're using the indexOf() method to find the index of this selected item within the todos_list array.
    //If the item is found in the array, indexOf() returns its index. If not found, it returns -1.
    //We store this index in the variable indexToRemove.

    if (indexToRemove !== -1) {
      //We then check if the index is not equal to -1. If it's not -1, it means the item was found in the array and is eligible for deletion.
      //Inside the if block, we use the splice() method to remove the item from the todos_list array. The splice() method modifies the array by removing or replacing existing elements.
      //We pass the indexToRemove as the starting index and 1 as the number of elements to remove, effectively removing just the selected item.
      //We log a message confirming the deletion of the item, using string interpolation to display the name of the deleted task.
      todos_list.splice(indexToRemove, 1);
      console.log(chalk.blue(`"${user_delete.index}" has been deleted.`));
    } else {
      console.log(chalk.red("Invalid selection."));
    }
    //Finally, we log the updated todos_list array after the deletion operation.
    console.log(chalk.green("Updated To Do List:", todos_list));
  }
  //---------------------------------------------------------------------------------------------------------
  //inquirer-5  (Ask To Exit App)
  let exit = await inquirer.prompt({
      name: "confirmationMessage",
      type: "confirm",
      message: chalk.yellow("Do You Want To Continue Task Management App?"),
      default: "yes",
    })
    condition = exit.confirmationMessage; // while loop continues if true, stops if false
    // while loop exits according to this confirmation message.
} //closing of while loop

console.log(chalk.blue("Yours checklist As:", todos_list));
//Author-"HUMA MOHSIN"