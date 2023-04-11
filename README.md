# Talent Poll
#### API Rest serverless(AWS) para armazenar a entidade talentos tornando possível a cunsulta por recrutadores.
---
#### Tech

- Serverless Framework
- Nodejs
- Typescript
- ExpressJs
- DynamoDB(aws)
- Vitest
- EventBridge(aws) 
---
### Features

[x] Modele/crie a tabela(DynamoDB) para talentos.
[x] Estruture o projeto inserindo padrões de projeto e typescript.
[x] Endpoint POST /talents para cadastrar novos talentos.
[x] Valide com Zod
[x] Endpoint GET /talents para consultar talentos com base em filtros.
[ ] Crie de testes unitários e integrados.

### Extra

[ ] Com o EventBridge dispare email para recrutadores que tenham interesse ao novo talento cadastrado na pool.
[ ] Cadastre via linkedin.
[ ] Cadastre via OCR, enviando um PDF do currículo.

