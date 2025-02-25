# App Molar Check

<img src="./registers/molarcheck logo.png" alt="Versão 0.01" style="zoom:50%;" />

# Introdução

  O app, proposto na disciplina MX853 (Ciência de dados cidadã), foi feito em parceria com uma pesquisadora da Faculdade de Odontologia de Piracicaba da Universidade Estadual de Campinas e visa atender à população ao mesmo tempo em que coleta dados para pesquisas sobre a doença HMI (Hipomineralização do Molar e Incisivo) ocorrente nas crianças. Minha participação no projeto foi no desenvolvimento completo do front-end, no qual utilizei React.js com Tailwind, além de bibliotecas, como SWR (integração das API's) e do Shadcn (componentes), e da integração do login e autenticação com o Google.
  
  O aplicativo conta com uma área para Responsáveis e outra para Especialistas, nas quais a página de responsável abre acesso às informações sobre a doença, cadastro de crianças e criação dos registros das criaças cadastradas, já a página do especialista permite que este diagnostique os registros de crianças feitos pelos responsáveis. Para acessar essas áreas, primeiramente é preciso que o usuário faça login com o google, mecanismo usado para autenticação no uso da aplicação, e cadastro, caso ainda não possua um.

  # Login com o Google e Cadastro de usuário: Responsável

https://github.com/user-attachments/assets/266d0192-4900-437b-8e1c-795e8467ab65

Neste fluxo, o usuário faz o login com o Google, se cadastra como Responsável (sou Paciente) e logo após pode fazer o registro de uma criança.

  # Página do Responsável + Cadastro de nova criança

https://github.com/user-attachments/assets/b34f0b44-0ab3-47dd-aea9-0a862738f78f

Logo após o cadastro da criança, é possível registrar seus dados para o diagnóstico, afim de criar um fluxo contínuo de decisões para o usuário.

# Adicionando registro para uma criança

https://github.com/user-attachments/assets/53d23499-f040-40e7-8bd7-2d5ccad223c0

Há duas possibilidade de chegar na página de Novo registro: 
* logo após o cadastro da criança clicando no botão "Criar agora"
* A partir do menu principal: "Minhas crianças" > "registros" (de uma criança cadastrada) > "Novo registro" (para a criança selecionada)

Obs.: No celular, ao selecionar o botão "Tirar foto" a câmera do celular é utilizada.

# Visualização dos registros da criança

https://github.com/user-attachments/assets/73a08cdc-c5b5-4aca-ab9d-ac6e3d816232

No vídeo, o usuário acessa o registro da criança "Julia Moreira", podendo visualizar as fotos tiradas e as informações inseridas no cadastro da criança e na crianção do registro. Em um primeiro momento, o registro ainda não possui diagnóstico, porém, quando o diagnóstico é feito por um especialista (teste feito em tempo real), a página é atualizada sendo possível visualizar o dado diagnóstico.

Obs.: Infelizmente este e o próximo vídeo estão em uma qualidade inferior pois foram gravados em uma resolução maior do que a atual e foram feitos na época em que o servidor que usávamos para o MinIO, recurso que utilizávamos para guardar as imagens, ainda estava em vigor, assim, para ilustrar a presença das imagens decidi usar eles.

# Login com o Google e envio de diagnóstico: Especialista (Dentista)

https://github.com/user-attachments/assets/0ac06542-00ca-492f-838f-db98435619e9

Assim que o usuário faz login com o google e se cadastra como Dentista, é dado acesso á página de avaliações em que pode diagnosticar os registros feitos por responsáveis. Quando selecionado um registro, o especialista pode visualizar os dados colocados no cadastro da criança e na criação do registro para análise e enviar o diagnóstico (dentre as opções: Presença de HMI; Sugestivo de HMI; Ausência de HMI; Foto inadequada para diagnóstico), além de um campo de observação.

