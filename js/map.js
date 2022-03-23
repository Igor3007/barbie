// Карта для блока контакты (+смена центра по клику на кнопки) 
if ($('#contacts_block-map').length > 0) {
	var contactsBlockMap;
	var contactsBlockMapCenter;
	var contactsBlockMapCoords = [];
	var contactsBlockMapZoom = 17;
	var contactsBlockMapNavItems = document.querySelectorAll('.contacts_block__nav-item');
	var contactsBlockMapNavBtns = document.querySelectorAll('.contacts_block__nav-btn');

	for (var contactsBlockMapNavBtn of contactsBlockMapNavBtns) {
		// получаем все координаты для карты
		var curentParentItem = contactsBlockMapNavBtn.closest('.contacts_block__nav-item');
		var currentCoords = contactsBlockMapNavBtn.dataset.mapCoords;
		var currentCoordsArr = currentCoords.split(', ');

		if (curentParentItem.classList.contains('active')) {
			contactsBlockMapCenter = currentCoordsArr;
		} else {
			contactsBlockMapCoords.push(currentCoordsArr);
		}

		// смена центра карты, номера телефона и расписания при клике на кнопку
		contactsBlockMapNavBtn.addEventListener('click', function () {
			var parentItem = this.closest('.contacts_block__nav-item');

			if (!parentItem.classList.contains('active')) {
				var currentSalonID = this.dataset.salonId;
				var currentItemCoords = this.dataset.mapCoords;
				var currentItemCoordsArr = currentItemCoords.split(',');

				$('.contacts_block').find('.info-item').slideUp(300);
				$('.contacts_block').find('.info-item[data-salon-id="' + currentSalonID + '"]').slideDown(300);

				contactsBlockMap.setCenter(currentItemCoordsArr, contactsBlockMapZoom);

				contactsBlockMapNavItems.forEach(function (curentItem) {
					curentItem.classList.remove('active');
				});

				parentItem.classList.add('active');
			}
		});
	}

	// загружаем карту при скроле
	function contactsBlockMapLoader() {
		console.log('loading ContactsBlockMap');

		window.removeEventListener('scroll', contactsBlockMapLoader);
		loadContactsBlockMap();
	}
	window.addEventListener('scroll', contactsBlockMapLoader);

	// создаем скрипт карты
	function loadContactsBlockMap() {
		var script = document.createElement('script');

		script.type = "text/javascript";
		script.src = "https://api-maps.yandex.ru/2.1/?apikey=СЮДА_ВСТАВЛЯЕМ_СВОЙ_API_КЛЮЧ&lang=ru_RU"; // <<< СЮДА ВСТАВИТЬ СВОЙ КЛЮЧ !!!
		script.onload = startContactsBlockMap;

		document.getElementById('contacts_block-map').appendChild(script);
	}

	// настройки карты
	function startContactsBlockMap() {
		ymaps.ready(function () {
			contactsBlockMap = new ymaps.Map('contacts_block-map', {
				controls: [],
				center: contactsBlockMapCenter,
				zoom: contactsBlockMapZoom
			}, {
				searchControlProvider: 'yandex#search'
			}),

				// разворот на весь экран
				fsControl = new ymaps.control.FullscreenControl({
					options: {
						size: "large",
						position: {
							left: 10,
							top: 20
						}
					}
				});

			// бегунок зума
			zoomControl = new ymaps.control.ZoomControl({
				options: {
					size: "large",
					position: {
						left: 10,
						top: 70
					}
				}
			});

			// метка центра карты
			centerPlacemark = new ymaps.Placemark(contactsBlockMap.getCenter(), {
				iconContent: ''
			}, {
				preset: 'islands#pinkBarberIcon',
				iconImageSize: [40, 45],
				iconImageOffset: [0, 0],
				iconContentOffset: [15, 15]
			});

			// добавляем остальные метки
			var baloonsCollection = new ymaps.GeoObjectCollection();
			for (let i = 0; i < contactsBlockMapCoords.length; i++) {
				baloonsCollection.add(new ymaps.Placemark(contactsBlockMapCoords[i], {
					balloonContent: ''
				}, {
					preset: 'islands#violetBarberIcon',
					iconImageSize: [40, 45],
					iconImageOffset: [0, 0],
					iconContentOffset: [15, 15]
				}));
			}
			contactsBlockMap.geoObjects.add(centerPlacemark).add(baloonsCollection);

			// включаем элементы управления карты
			contactsBlockMap.controls.add(fsControl);
			contactsBlockMap.controls.add(zoomControl);

			// отключаем зум карты колесиком мыши
			contactsBlockMap.behaviors.disable('scrollZoom');
		});
	}
}
// ============================================================================================

// Карта для страницы Контакты
if ($('#contacts').length > 0) {
	var contactsMap1 = document.getElementById('contacts-map1');
	var contactsMap2 = document.getElementById('contacts-map2');

	// загружаем карту при скроле
	// function contactsMapLoader() {
	// 	console.log('loading ContactsMap');

	// 	window.removeEventListener('scroll', contactsMapLoader);
	// 	loadContactsMap();
	// }
	// window.addEventListener('scroll', contactsMapLoader);

	// загружаем карту
	loadContactsMap();

	// создаем скрипт карты
	function loadContactsMap() {
		if (contactsMap1 || contactsMap2) {
			var script = document.createElement('script');
			script.type = "text/javascript";
			script.src = "https://api-maps.yandex.ru/2.1/?apikey=СЮДА_ВСТАВЛЯЕМ_СВОЙ_API_КЛЮЧ&lang=ru_RU"; // <<< СЮДА ВСТАВИТЬ СВОЙ КЛЮЧ !!!
			script.onload = startContactsMap;

			document.getElementById('contacts').appendChild(script);
		}
	}

	// настройки карты №1
	function startContactsMap(el) {
		ymaps.ready(function (el) {

			if (contactsMap1) {
				var contactsMap1Coords = contactsMap1.dataset.mapCoords;
				var contactsMap1CoordsArr = contactsMap1Coords.split(', ');

				var map1 = new ymaps.Map(contactsMap1, {
					controls: [],
					center: contactsMap1CoordsArr,
					zoom: 17
				}, {
					searchControlProvider: 'yandex#search'
				}),

					// разворот на весь экран
					fsControl = new ymaps.control.FullscreenControl({
						options: {
							size: "large",
							position: {
								left: 10,
								top: 20
							}
						}
					});

				// бегунок зума
				zoomControl = new ymaps.control.ZoomControl({
					options: {
						size: "large",
						position: {
							left: 10,
							top: 70
						}
					}
				});

				// метка центра карты
				centerPlacemark = new ymaps.Placemark(map1.getCenter(), {
					iconContent: ''
				}, {
					preset: 'islands#pinkBarberIcon',
					iconImageSize: [40, 45],
					iconImageOffset: [0, 0],
					iconContentOffset: [15, 15]
				});
				map1.geoObjects.add(centerPlacemark);

				// включаем элементы управления карты
				map1.controls.add(fsControl);
				map1.controls.add(zoomControl);

				// отключаем зум карты колесиком мыши
				map1.behaviors.disable('scrollZoom');
			}

			// настройки карты №2
			if (contactsMap2) {
				var contactsMap2Coords = contactsMap2.dataset.mapCoords;
				var contactsMap2CoordsArr = contactsMap2Coords.split(', ');

				var map2 = new ymaps.Map(contactsMap2, {
					controls: [],
					center: contactsMap2CoordsArr,
					zoom: 17
				}, {
					searchControlProvider: 'yandex#search'
				}),

					// разворот на весь экран
					fsControl = new ymaps.control.FullscreenControl({
						options: {
							size: "large",
							position: {
								left: 10,
								top: 20
							}
						}
					});

				// бегунок зума
				zoomControl = new ymaps.control.ZoomControl({
					options: {
						size: "large",
						position: {
							left: 10,
							top: 70
						}
					}
				});

				// метка центра карты
				centerPlacemark = new ymaps.Placemark(map2.getCenter(), {
					iconContent: ''
				}, {
					preset: 'islands#pinkBarberIcon',
					iconImageSize: [40, 45],
					iconImageOffset: [0, 0],
					iconContentOffset: [15, 15]
				});
				map2.geoObjects.add(centerPlacemark);

				// включаем элементы управления карты
				map2.controls.add(fsControl);
				map2.controls.add(zoomControl);

				// отключаем зум карты колесиком мыши
				map2.behaviors.disable('scrollZoom');
			}
		});
	}
}
