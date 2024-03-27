// Write your tests here
import React from "react";
import {render, screen} from "@testing-library/react";
//import {userEvent} from "@testing-library/user-event";
//user event is not installed and I dunno if installing it will mess with codegrade or anything else
import "@testing-library/jest-dom";
import AppFunctional from "./AppFunctional.js";

describe("my written tests for AppFunctional", () => {
  beforeEach(() => {
    render(<AppFunctional />)
    //const user = userEvent.setup()
  })
  /*test('input field changes', async () => {
    let emailInput = screen.getByPlaceholderText("type email");
    await user.type(emailInput, "Takenoko@bamboo.yum");
    expect(await screen.findByText("Takenoko@bamboo.yum")).toBeVisible();
  })*/
  test("steps renders on the screen", () => {
    screen.getByText("You moved ", {exact: false})
  })
  test("buttons render on the screen", () => {
    screen.getByText("UP")
    screen.getByText("DOWN")
    screen.getByText("RIGHT")
    screen.getByText("LEFT")
    screen.getByText("reset")
  })
  test("coordinates renders on the screen", () => {
    expect(screen.queryByText("Coordinates", {exact: false})).toBeVisible()
  })
  test("email renders on the screen", () => {
    screen.getByPlaceholderText("type email")
  })

})

