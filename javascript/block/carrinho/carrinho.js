			var montaPropaganda = function(){
				var propaganda = ["O que acha de comprar um livro?","Que tal comprar um E-Book?","O que acha de comprar um notebook?"];
				var posicao = Math.floor(propaganda.length * Math.random());
				var texto = propaganda[posicao];
				var tr = $("<tr>").addClass("propaganda").append("<td>");
				tr.find("td").attr("colspan", 6).text(texto);
				return tr;
			}
			var atualizaDados = function (){
				var carrinhos = $('.carrinho');
				carrinhos.each( function(){
					var carrinho = $(this);
					var valorTotal = carrinho.find('.valor-total:visible');
					var total = 0;
					for(var i =0; i < valorTotal.length; i++){
					var item = $(valorTotal[i]);
					var valor = parseFloat(item.text());
					total += valor;
				}
				carrinho.find('.totalGeral').text(total);
				carrinho.find('.totalItens').text(valorTotal.length);
			})};

			daDestaque = function(){
				$(this).addClass("hovering").fadeIn();
				$(this).find(".remove-item").fadeIn();
			}

			tiraDestaque = function(){
				$(this).removeClass("hovering");
				$(this).find(".remove-item").fadeOut();
			}

			var alteraPropagandas = function(event){
				event.preventDefault();
				$(".propaganda").fadeToggle();
				$(".alternaPropaganda").toggle();
			};

			function aposInicializado(){
				atualizaDados();
				$('.remove-item').on('click', removeItem);
				$('.undo').on('click', undo);
				$(".carrinho").each(function(){
					var carrinho = $(this);
					carrinho.find("tr:nth-child(3n),tr:last").each(function(){
						montaPropaganda().insertAfter($(this));
					})
				});
				$(".carrinho tbody tr").hover(daDestaque, tiraDestaque);
				$(".alternaPropaganda").on("click", alteraPropagandas);
			};

			var undo = function(){
				$(this).closest('.carrinho').find("tr:visible").removeClass("recuperado");
				var trs = $(this).closest('.carrinho').find("tr:hidden");
				trs.addClass("recuperado").show();
				atualizaDados();
			};

		  var removeItem = function (event){
				event.preventDefault();
				$(this).closest("tr").hide().fadeOut();
				atualizaDados();
			};
			$(aposInicializado);
