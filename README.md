# Acesso à instância AWS na Amazon

https://aws.amazon.com/

E-mail: censo@sandrosantos.net

Senha: l9H7f5$cq?


# Configurações do projeto:

## Gerar e publicar versão:

Dar o seguinte comando:

`yarn build`

Depois copiar a pasta gerada (build) para o servidor

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
