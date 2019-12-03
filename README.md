# Acesso à instância AWS na Amazon

## Gerenciamento

https://aws.amazon.com/

E-mail: censo@sandrosantos.net

Senha: l9H7f5$cq?

## ssh

1 - Baixar o .pem que está presente no projeto

2 - Na primeira vez, alterar a permissão do arquivo:

`chmod 400 /path/my-key-pair.pem`

3 - Acessar o servidor utilizando o seguinte comando:

`ssh -i /path/arquivo.pem ubuntu@{endereçodaaplicação}`


# Configurações do projeto:

## Gerar e publicar versão:

1 - No apiService certificar-se de que o apiUrl está definido como http://{endereçodaaplicação:porta}/api

2 - Gerar o build:

`yarn build`

3 - Copiar a pasta gerada (build) para o servidor

4 - Iniciar o servidor (pm2):

`pm2 start npm -- run start:prod`

ou

4 - Reniciar o servidor (pm2):

`pm2 start 0`


## Gerar novo curso para preenchimento:

Efetuar requisição POST para http://{endereçodaaplicação:porta}/api/admin/form

```
{
  "form": {
    "nome": "Teste"
  },
  "config": {
    "type": "curso",
    "period": "2019",
    "deadline": "2020-05-31"
  }
}
```
