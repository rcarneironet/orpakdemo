CREATE TABLE [dbo].[Pessoa] (
    [Id]             INT             IDENTITY (1, 1) NOT NULL,
    [Nome]           VARCHAR (100)   NOT NULL,
    [DataNascimento] DATETIME        NOT NULL,
    [Celular]        VARCHAR (9)     NOT NULL,
    [Email]          VARCHAR (100)   NOT NULL,
    [Salario]        DECIMAL (18, 2) NOT NULL,
    [Horas]          DECIMAL (5,2)      NOT NULL,
    [IsDeleted] BIT NOT NULL, 
    [LastModification] DATETIME NOT NULL, 
    CONSTRAINT [PK_Pessoa] PRIMARY KEY CLUSTERED ([Id] ASC)
);

