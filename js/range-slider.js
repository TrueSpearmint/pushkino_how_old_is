// js-код слайдера в верху страницый

let sliderOne = document.getElementById("slider-1"); // находит элемент с id slider-1 на странице и сохраняет его в переменную inputSlider //
let sliderTwo = document.getElementById("slider-2"); // находит элемент с id slider-2 на странице и сохраняет его в переменную inputSlider //
let displayValOne = document.querySelector(".value.left"); // находит первый элемент с классом "value" и "left" на странице и сохраняет его в переменную slideValue //
let displayValTwo = document.querySelector(".value.right"); // находит первый элемент с классом "value" и "right" на странице и сохраняет его в переменную slideValue //
let minGap = 0; // устанавливает минимальный разрыв между двумя значениями слайдера //
let sliderTrack = document.querySelector(".slider-track"); // получает ссылку на элемент с классом "slider-track" //
let sliderMaxValue = document.getElementById("slider-1").max; // получает максимальное значение первого слайдера //

function slideOne() {
  // Проверяем, не меньше ли разница между значениями второго и первого слайдеров, чем минимальный разрыв
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    // Если разница меньше или равна минимальному разрыву, корректируем значение первого слайдера
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
  }
  // Обновляем текстовое содержимое элемента, отображающего текущее значение первого слайдера
  displayValOne.textContent = sliderOne.value;
  // Вызываем функцию fillColor(), чтобы обновить фоновую линию слайдера
  fillColor();
  filterYearOne = [">=", ["number", ["get", "year_built_processed"]], parseInt(sliderOne.value)];
  map.setFilter("buildings_pushkino_how_old_is_id", [
    "all",
    filterNotEmpty,
    filterYearOne,
    filterYearTwo,
  ]);
}
function slideTwo() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderTwo.value = parseInt(sliderOne.value) + minGap;
  }
  displayValTwo.textContent = sliderTwo.value;
  fillColor();
  filterYearTwo = ["<=", ["number", ["get", "year_built_processed"]], parseInt(sliderTwo.value)];
  map.setFilter("buildings_pushkino_how_old_is_id", [
    "all",
    filterNotEmpty,
    filterYearOne,
    filterYearTwo,
  ]);
}

minValue = 1694;
maxValue = 2024;
rangeDifference = maxValue - minValue;
function fillColor() {
  // Вычисляем проценты относительно максимального значения слайдера для первого и второго слайдеров
  percent1 = ((sliderOne.value - minValue) / rangeDifference) * 100;
  percent2 = ((sliderTwo.value - minValue) / rangeDifference) * 100;
  // Устанавливаем цвета фоновой линии слайдера слева направо
  sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}
