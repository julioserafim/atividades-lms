$(document).ready(function(){

	var baralho = JSON.parse(localStorage.getItem('baralho'));
	var dealer = JSON.parse(localStorage.getItem('dealer'));
	var maleta = JSON.parse(localStorage.getItem('maleta'));

	finalizando();
	feitas();

	function finalizando(){
		$('.tabela').empty();

		if (baralho['qtd'] > 0) {
			$('.tabela').append("<tr>	<td>Boné comum</td>	<td> " +baralho['qtd']+ " </td>	<td>R$ "+ baralho['preco'] +"</td>	</tr>");
		}

		if (dealer['qtd'] > 0) {
			$('.tabela').append("<tr>	<td>dealer comum</td>	<td> " + dealer['qtd'] +" </td>	<td>R$ "+ dealer['preco'] +"</td>	</tr>");
		}

		if (maleta['qtd'] > 0) {
			$('.tabela').append("<tr>	<td>Tênis comum</td>	<td> "+maleta['qtd']+" </td>	<td>R$ "+ maleta['preco']+"</td>	</tr>");
		}

		$('.total').append("Total: R$"+ (baralho['precoTotal'] + dealer['precoTotal'] + maleta['precoTotal']) );
	};

	function feitas(){
		$.ajax({
      type:"GET",
      url: "http://rest.learncode.academy/api/juliomartins/produtos-compras",
      success: function(result){
				console.log(result);
				$('.feitas').empty();
				if (result.length !== 0) {
					for (variable of result) {
						if (variable['usuario'] === localStorage.getItem('usuario')) {
							$('.feitas').append("<tr> <td> "+ variable['data'] +" </td> <td>R$ "+ variable['valor'] +"</td> </tr>");
						}
					}
				}
			}
    });
	};

	$('.finalizar').on('click', function(){
		if ((baralho['precoTotal'] + dealer['precoTotal'] + maleta['precoTotal']) > 0) {
			$.ajax({
	      type:"POST",
	      url:"http://rest.learncode.academy/api/juliomartins/produtos-compras",
				data: {
					usuario: localStorage.getItem('usuario'),
					valor: baralho['precoTotal'] + dealer['precoTotal'] + maleta['precoTotal'],
					data: new Date()
				},
	      success: function (data) {
	          
	          console.log(data);
						feitas();

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
							'nome': 'Malete de Poker',
							'qtd': 0,
							'preco': 145.00,
							'precoTotal': 0.00
						}));

						$('.container > .mensagens').empty();
						$('.container > .mensagens').append("<div class='alert alert-success'> <strong>Success!</strong> Compra efetuada. <span class='close'>&times;</span> </div>");
						$(".close").click(function(){
								$(this).parent().hide();
						});
						location.reload();
						return 1;
	      }
		  });
		} else {
			$('.container > .mensagens').empty();
			$('.container > .mensagens').append("<div class='alert alert-danger'> <strong>Danger!</strong> Não há nenhuma compra realizada. <span class='close'>&times;</span></div>");
			$(".close").click(function(){
					$(this).parent().hide();
			});
		}

	});

});
