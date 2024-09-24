-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_id_key" ON "Item"("id");

-- Habilitar RLS na tabela Item
ALTER TABLE "Item" ENABLE ROW LEVEL SECURITY;

-- Criar política de seleção
CREATE POLICY select_policy ON "Item"
FOR SELECT
USING (true); -- Todos os usuários podem fazer SELECT

-- Criar política para inserção, atualização e deleção apenas para administradores
CREATE POLICY admin_policy ON "Item"
FOR ALL
USING (current_user = 'admin'); -- Altere 'admin' conforme necessário
