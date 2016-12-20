const PRID = 5759873;

function dragStart(ev) {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData("Text", ev.target.getAttribute('data-uid'));
    ev.dataTransfer.setDragImage(ev.target, 100, 100);
    return true;
}

function dragDrop(ev) {
    var data = ev.dataTransfer.getData("Text");
    console.log('ev', ev.target);
    if (ev.target.classList.contains('items_list__list') || ev.target.parentNode.classList.contains('items_list__list')) {
        console.info('yes');
        ev.target.appendChild(document.querySelector('[data-uid="'+data+'"]'));
    }
    ev.stopPropagation();
    return false;
}

function dragEnter(ev) {
    event.preventDefault();
    return true;
}

function dragOver(ev) {
    event.preventDefault();
}

VK.init({
    apiId: PRID
});

function login() {
    return new Promise(function(resolve, reject) {
        VK.Auth.login(function(response) {
            if (response.status == 'connected') {
                resolve();
            } else {
                reject();
            }
        }, 2)
    });
}

login().then(function() {
    console.log('Авторизован!');
    return new Promise(function(resolve, reject) {
        VK.api('friends.get', {
            'order': 'name',
            // 'count': '5',
            'fields': [
                'nickname',
                'photo_100'
            ]
        }, function(response) {
            if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                var user_temp1 = Handlebars.compile(document.getElementById('user_temp1').innerHTML);
                var $list_item1 = document.querySelector('.list--item1 .items_list__list');
                var $list_item2 = document.querySelector('.list--item2 .items_list__list');
                $list_item1.innerHTML = user_temp1(response);

                $list_item1.addEventListener('click', function(e) {
                    if (e.target.getAttribute('data-event')) {
                        console.log('yes', e.target);
                        // изменим класс у кнопки
                        e.target.classList.remove('btn--add');
                        e.target.classList.add('btn--remove');
                        // находим пользователя на кнопку которого кликнули
                        var $item = document.querySelector('[data-uid="' + e.target.getAttribute('data-event') + '"]');
                        // Добавляем в список
                        $list_item2.appendChild($item);
                    }
                });

				var $userAll = document.querySelectorAll('.list--item1 .user');
				console.log($userAll.length);
				for (var i=0; i < $userAll.length; i++) {
					$userAll[i].addEventListener('dragstart', function(e) {
						dragStart(e);
					})
				};
                $list_item2.addEventListener('dragenter', dragEnter);
                $list_item2.addEventListener('drop', dragDrop);
                $list_item2.addEventListener('dragover', dragOver);

                $list_item2.addEventListener('click', function(e) {
                    if (e.target.getAttribute('data-event')) {
                        console.log('yes', e.target);
                        // изменим класс у кнопки
                        e.target.classList.remove('btn--remove');
                        e.target.classList.add('btn--add');
                        // находим пользователя на кнопку которого кликнули
                        var $item = document.querySelector('[data-uid="' + e.target.getAttribute('data-event') + '"]');
                        // Добавляем в список
                        $list_item1.appendChild($item);
                    }
                });


            }
        })
    });
}, function() {
    console.log('Ошибка авторизации');
}).catch(function(e) {
    console.error(`Ошибка: ${e.message}`)
});
//
// new Promise(function(resolve) {
//     if (document.readyState === 'complete') {
//         resolve();
//     } else {
//         window.onload = resolve;
// 	}).then(function() {
//     }
//     return new Promise(function(resolve, reject) {
//         VK.init({
//             apiId: 5759873
//         });
//         VK.Auth.login(function(response) {
//             if (response.session) {
//                 resolve(response);
//             } else {
//                 reject(new Error('Не удалось авторизоваться'));
//             }
//         }, 8);
//     });
// }).then(function() {
//     return new Promise(function(resolve, reject) {
//         VK.api('users.get', {
//                 'name_case': 'gen'
//             },
//             function(response) {
//                 if (response.error) {
//                     reject(new Error(response.error.error_msg));
//                 } else {
//                     headerInfo.textContent = 'Музыка на странице' +
//                         response.response[0].first_name + ' ' + response.
//                     response[0].last_name;
//
//                     resolve(response.response[0].uid);
//                 }
//             });
//     })
// }).then(function(uid) {
//     return new Promise(function(resolve, reject) {
//         console.log('uid', uid);
//         VK.api('friends.get', {
//             'user_id': uid,
//             'count': 3,
//             'fields': ['domain', 'city']
//         }, function(response) {
//             if (response.error) {
//                 reject(new Error(response.error.error_msg));
//             } else {
//                 console.log('res: ', response);
//                 resolve();
//             }
//         })
//     });
// }).catch(function(e) {
//     alert('Ошибка: ' + e.message);
// });
