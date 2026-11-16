# Qualidade Veículos
Site de seminovos e painel administrativo em português, preparado para Vercel e Neon Postgres.

## Uso
- Site: `/`. Catálogo com busca, marca, preço, categoria e ordenação.
- Detalhe: `/veiculo/UUID`. Galeria, ficha e WhatsApp com o veículo na mensagem.
- Painel: `/admin`. Primeiro acesso exige BOOTSTRAP_TOKEN; cria um administrador único.
- Veículos: adicionar, editar, destacar, reservar, arquivar e republicar.
- Fotos: envio pelo celular/computador, compressão JPEG, limite de 20 por veículo, 1 MB por imagem armazenada. Capa selecionável.
- Vendedores: nomes, WhatsApp, cargo e visibilidade. São contatos públicos, não contas de login.
- Vendas: registro atômico, histórico, filtro mensal e CSV. Uma venda por veículo; vendido sai do catálogo. Correções/cancelamentos de vendas não estão nesta versão.
- Conta: troca de senha e encerramento das sessões.

## Configuração
Node 22 ou superior. `npm install`, `npm run build`. Vercel: framework Other, diretório público `public`, funções `api/`.
Variáveis privadas de produção: DATABASE_URL e BOOTSTRAP_TOKEN (aleatório, pelo menos 24 bytes). Nunca prefixar com PUBLIC ou versionar valores.
Aplique `db/001_initial.sql` e, apenas na instalação inicial, `db/002_seed.sql`. Migrations/seed estão versionados e são idempotentes.
Não conectar previews ao banco de produção. Configure uma branch Neon separada para homologação.

## Segurança
Sessões opacas com SHA-256 no banco, cookie HttpOnly/Secure/SameSite=Strict, expiração de 8 horas, senha scrypt com salt, limitação persistente de tentativas, validação de origem em POST, SQL parametrizado e validação no servidor. O primeiro administrador é protegido por token e unicidade no banco; não há cadastro público livre.
Dados públicos incluem apenas veículos disponíveis/reservados e contatos ativos. Detalhe vendido permanece acessível por link. Rascunhos, arquivados, vendas e administração exigem sessão.
Revisão numérica evita sobrescritas concorrentes de veículos. Vendas fazem atualização + inserção atomicamente. Auditoria registra alterações.

## Conteúdo inicial e limites
Oito veículos e três telefones foram transcritos do site oficial em 16/11/2026, sem sincronização automática. A disponibilidade deve ser conferida pela loja.
Nomes dos vendedores não foram verificados: contatos iniciais se chamam Atendimento 1, 2 e 3; altere no painel.
Fotografias iniciais usam URLs do site original. Novos uploads ficam no banco; para grande volume recomenda-se migrar os binários para armazenamento de objetos. Fotos enviadas e removidas do formulário são preservadas, não há coleta automática de órfãos.
A marca textual é uma composição provisória, não um arquivo oficial de logotipo. Pinterest orientou o visual escuro; Instagram restringiu leitura automatizada.
Administração tem uma conta gestora inicial. Não há gestão de contas individuais de vendedores, CRM de leads, pagamentos, propostas de financiamento ou envio automático de mensagens.
Listagem pública limitada a 500 veículos; administração a 1000 veículos e 2000 vendas.
Sem integração com sistema antigo, sem troca de DNS do domínio atual.

## Validação
O build verifica sintaxe de JavaScript, referências de assets e testes de validação/autenticação/CSRF.
Revisão visual e teste completo autenticado devem ser realizados após a ativação do administrador. `npm run dev` serve em localhost, com DATABASE_URL para APIs; cookies seguros exigem HTTPS para login.
