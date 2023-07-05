"use strict";

{
  const canvas = document.querySelector("#canvas");
  const penColor = document.querySelector("#pen-color");
  const penWidth = document.querySelector("#pen-width");
  const clear = document.querySelector("#clear");
  const eraser = document.querySelector("#eraser");
  const eraserWidth = document.querySelector("#eraser-width");

  let startX;
  let startY;
  let x;
  let y;
  const marginWidth = 50 + 1;
  let ctx;
  let isDrawing = false;

  function draw() {
    if (typeof canvas.getContext === "undefined") {
      return;
    }
    ctx = canvas.getContext("2d");
  }
  draw();

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    // console.log("down");
    startX = e.pageX - marginWidth;
    startY = e.pageY - marginWidth;
  });
  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) {
      return;
    }
    // console.log("move");
    x = e.pageX - marginWidth;
    y = e.pageY - marginWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY); /*開始地点*/
    ctx.lineTo(x, y);
    ctx.stroke();
    startX = x;
    startY = y;
  });

  canvas.addEventListener("mouseup", () => {
    console.log("up");
    isDrawing = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });

  //   ペンの色を変える処理
  penColor.addEventListener("change", () => {
    // console.log("changed");
    ctx.strokeStyle = penColor.value;
  });

  penWidth.addEventListener("change", () => {
    ctx.lineWidth = penWidth.value;
  });

  clear.addEventListener("click", () => {
    // confirm("消去しますか？");
    if (!confirm("全て消去しますか?")) {
      return;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });

  eraser.addEventListener("click", () => {
    ctx.strokeStyle = "#FFFFFF";
  });

  eraserWidth.addEventListener("click", () => {
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = eraserWidth.value;
  });
}
