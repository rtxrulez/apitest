const PRID = 5759873;
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
			'count': '5',
			'fields': [
				'nickname',
				'photo_100'
			]
		}, function(response) {
			if (response.error) {
				reject(new Error(response.error.error_msg));
			} else {
				console.log('friends: ', response);
				
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
