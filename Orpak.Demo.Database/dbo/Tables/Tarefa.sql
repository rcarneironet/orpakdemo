CREATE TABLE [dbo].[Tarefa] (
    [Id]            INT             IDENTITY (1, 1) NOT NULL,
    [PessoaId]      INT             NOT NULL,
    [Descricao]     VARCHAR (100)   NOT NULL,
    [HoraInicio]    DATETIME        NOT NULL,
    [HoraFim]       DATETIME        NOT NULL,
    [Status]        INT             NOT NULL,
    [HorasAlocadas] DECIMAL (5, 2)  NOT NULL,
    [ValorHora]     DECIMAL (18, 2) NOT NULL,
    [Total]         DECIMAL (18, 2) NOT NULL,
	[IsDeleted]		BIT NOT NULL, 
    [LastModification] DATETIME NOT NULL, 
    CONSTRAINT [PK_Tarefa] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Tarefa_Pessoa] FOREIGN KEY ([PessoaId]) REFERENCES [dbo].[Pessoa] ([Id])
);

