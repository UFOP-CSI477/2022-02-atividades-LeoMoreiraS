

Scenario: Como usuário, eu quero conseguir visualizar os vídeos que foram enviados para a plataforma a fim de ter um fácil acesso a listagem dos vídeos;
Dado que o usuário quer acessar o vídeo
Quando clica em Lets go
Então aparece a listagem de vídeo

Scenario: Como usuário, eu quero conseguir assistir um vídeo exibido na listagem para consumir o conteúdo da plataforma;
Dado que o usuário quer exibir um vídeo
Quando clica no play
Então direciona para assistir o vídeo

Scenario: Como usuário, eu quero fazer o upload de um vídeo (.mp4) com uma thumbnail (.jpeg) para poder visualizá-lo posteriormente;
Dado que o usuário quer enviar um vídeo para plataforma
Quando clica em upload
E escolher o arquivo desejado 
Então clica em confirmar

Scenario: Como usuário, eu quero excluir vídeos que foram enviados para a plataforma para limpar o espaço de armazenamento do sistema;
Dado que o usuário quer excluir um vídeo
Quando clica remover
Então exclui o vídeo.