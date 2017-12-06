$(document).ready(function(){

	if (localStorage.getItem('usuario')) {
		$('li.desativo').removeClass('desativo').addClass('ativo');
		$('footer.desativo').removeClass('desativo').addClass('ativo');

		$('#entrar').addClass('desativo');
		$('#cadastrar').addClass('desativo');
	}

	$('.cadastrar').on('click', function(){

		if($("#campo-usuario").val()== "" || $("#campo-senha").val() ==""){
			$('.container > .mensagens').append("<div class='alert alert-danger'> <strong>Danger!</strong> Preencha todos os campos! <span class='close'>&times;</span></div>");
			
			return false;
		}


		var cadastro = {
			nome: $('.usuario-cadastro').val().trim(),
			senha: $('.senha-cadastro').val().trim()
		};

		$.ajax({
      type:"GET",
      url:"http://rest.learncode.academy/api/juliomartins/usuarios-cadastrados",
      success: function (result) {
          for (variable of result) {
          	if (variable['nome'] == cadastro['nome']) {
							$('.container > .mensagens').empty();
          		$('.container > .mensagens').append("<div class='alert alert-danger'> <strong>Danger!</strong> Usuário com mesmo dados/Preencha todos os campos <span class='close'>&times;</span></div>");
							$(".close").click(function(){
	                $(this).parent().hide();
	            });
							return 1;
          	}
          }
					$.ajax({
						type:"POST",
						url:"http://rest.learncode.academy/api/juliomartins/usuarios-cadastrados",
						data: cadastro,
						success: function (data) {
								$('.container > .mensagens').empty();
								$('.container > .mensagens').append("<div class='alert alert-success'> <strong>Success!</strong> Cadastro efetuado. <span class='close'>&times;</span> </div>");
								$(".close").click(function(){
		                $(this).parent().hide();
		            });
								console.log(data);
						}
					});
      }
	  });
	});

	$('.entrar').on('click', function(){
		$.ajax({
      type:"GET",
      url: "http://rest.learncode.academy/api/juliomartins/usuarios-cadastrados",
      success: function(result){
				console.log(result);
				if (result.length !== 0) {
					for (variable of result) {
						if ($('.usuario-login').val().trim() == variable['nome'] && $('.senha-login').val().trim() == variable['senha']) {
							console.log(result);

							localStorage.setItem('usuario', variable['id']);

							localStorage.setItem('baralho', JSON.stringify({
								'nome': 'Baralho Texas Holdem',
								'qtd': 0,
								'preco': 34.00,
								'precoTotal': 0.00
							}));

							localStorage.setItem('dealer', JSON.stringify({
								'nome': 'Botão Dealer',
								'qtd': 0,
								'preco': 56.00,
								'precoTotal': 0.00
							}));

							localStorage.setItem('maleta', JSON.stringify({
								'nome': 'Maleta',
								'qtd': 0,
								'preco': 145.00,
								'precoTotal': 0.00
							}));


							$('li.desativo').removeClass('desativo').addClass('ativo');
							$('footer.desativo').removeClass('desativo').addClass('ativo');

							$('#entrar').addClass('desativo');
							$('#cadastrar').addClass('desativo');

							$('.container > .mensagens').empty();
							$('.container > .mensagens').append("<div class='alert alert-success'> <strong>Success!</strong> Login efetuado. <span class='close'>&times;</span> </div>");
							$(".close").click(function(){
	                $(this).parent().hide();
	            });
							return 1;
						}
					}
					$('.container > .mensagens').empty();
					$('.container > .mensagens').append("<div class='alert alert-danger'> <strong>Danger!</strong> Este usuário não está cadastrado/Preencha os dados em branco! <span class='close'>&times;</span></div>");
					$(".close").click(function(){
							$(this).parent().hide();
					});
				} else {
					$('.container > .mensagens').empty();
					$('.container > .mensagens').append("<div class='alert alert-danger'> <strong>Danger!</strong> Não há nenhum usuário cadastrado. <span class='close'>&times;</span></div>");
					$(".close").click(function(){
							$(this).parent().hide();
					});
				}

			}
    });
	});

	$('.sair').on('click', function(){
		localStorage.clear();
		$('li.ativo').removeClass('ativo').addClass('desativo');
		$('footer.ativo').removeClass('ativo').addClass('desativo');

		$('#entrar').removeClass('desativo');
		$('#cadastrar').removeClass('desativo');

		$('.container > .mensagens').empty();
		$('.container > .mensagens').append("<div class='alert alert-info'> <strong>Info!</strong> Você está deslogado. <span class='close'>&times;</span> </div>");
		$(".close").click(function(){
				$(this).parent().hide();
		});
	});

	$('.adicionar-baralho').on('click', function(){
		var cesta = JSON.parse(localStorage.getItem('baralho'));

		var qtd = $('.baralho-qtd').val();
		cesta['qtd'] = parseInt(qtd) + parseInt(cesta['qtd']);
		cesta['precoTotal'] = (qtd * cesta['preco']) + parseInt(cesta['precoTotal']) ;

		localStorage.setItem('baralho', JSON.stringify(cesta));

		console.log(localStorage.getItem('baralho'));

		$('.container > .mensagens').empty();
		$('.container > .mensagens').append("<div class='alert alert-info'> <strong>Info!</strong> Adicionou " + qtd +" baralhos <span class='close'>&times;</span> </div>");
		$(".close").click(function(){
				$(this).parent().hide();
		});
	});

	$('.adicionar-dealer').on('click', function(){
		var cesta = JSON.parse(localStorage.getItem('dealer'));

		var qtd = $('.dealer-qtd').val();
		cesta['qtd'] = parseInt(qtd) + parseInt(cesta['qtd']);
		cesta['precoTotal'] = (qtd * cesta['preco']) + parseInt(cesta['precoTotal']) ;

		localStorage.setItem('dealer', JSON.stringify(cesta));

		console.log(localStorage.getItem('dealer'));

		$('.container > .mensagens').empty();
		$('.container > .mensagens').append("<div class='alert alert-info'> <strong>Info!</strong> Adicionou " + qtd +" botões dealer <span class='close'>&times;</span> </div>");
		$(".close").click(function(){
				$(this).parent().hide();
		});
	});

	$('.adicionar-maleta').on('click', function(){
		var cesta = JSON.parse(localStorage.getItem('maleta'));

		var qtd = $('.maleta-qtd').val();
		cesta['qtd'] = parseInt(qtd) + parseInt(cesta['qtd']);
		cesta['precoTotal'] = (qtd * cesta['preco']) + parseInt(cesta['precoTotal']) ;

		localStorage.setItem('maleta', JSON.stringify(cesta));

		console.log(localStorage.getItem('maleta'));

		$('.container > .mensagens').empty();
		$('.container > .mensagens').append("<div class='alert alert-info'> <strong>Info!</strong> Adicionou " + qtd +" maletas <span class='close'>&times;</span> </div>");
		$(".close").click(function(){
				$(this).parent().hide();
		});
	});

	$('.compras').on('click', function(){
		var baralho = JSON.parse(localStorage.getItem('baralho'));
		var dealer = JSON.parse(localStorage.getItem('dealer'));
		var maleta = JSON.parse(localStorage.getItem('maleta'));

		$('.cesta').empty();

		if (baralho['qtd'] > 0) {
			$('.cesta').append("<div class='row'> <div class='col-sm-5'> <img src='img/baralho.jpg'> </div> <div class='col-sm-4'> <h4>Baralho Texas Holdem</h2> <h6>Quantidade: "+baralho['qtd']+" </h6> </div> <div class='col-sm-3'> <h4>R$ "+baralho['preco']+"</h4> </div> </div>");
		}

		if (dealer['qtd'] > 0) {
			$('.cesta').append("<div class='row'> <div class='col-sm-5'> <img src='img/dealer.jpg'> </div> <div class='col-sm-4'> <h4>Botão Dealer</h2> <h6>Quantidade: "+dealer['qtd']+" </h6> </div> <div class='col-sm-3'> <h4>R$ "+dealer['preco']+"</h4> </div> </div>");
		}

		if (maleta['qtd'] > 0) {
			$('.cesta').append("<div class='row'> <div class='col-sm-5'> <img src='img/maleta.jpg'> </div> <div class='col-sm-4'> <h4>Maleta de Poker</h2> <h6>Quantidade: "+maleta['qtd']+" </h6> </div> <div class='col-sm-3'> <h4>R$ "+maleta['preco']+"</h4> </div> </div>");
		}

		if (baralho['qtd'] == 0 && dealer['qtd'] == 0 && maleta['qtd'] == 0) {
			$('.cesta').append("<h2>Cesta vazia.</h2>");
		}
	});

});


