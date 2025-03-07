USE [master]
GO
/****** Object:  Database [videogameloans]    Script Date: 26/02/2025 16:59:54 ******/
CREATE DATABASE [videogameloans]
 GO
ALTER DATABASE [videogameloans] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [videogameloans].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [videogameloans] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [videogameloans] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [videogameloans] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [videogameloans] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [videogameloans] SET ARITHABORT OFF 
GO
ALTER DATABASE [videogameloans] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [videogameloans] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [videogameloans] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [videogameloans] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [videogameloans] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [videogameloans] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [videogameloans] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [videogameloans] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [videogameloans] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [videogameloans] SET  DISABLE_BROKER 
GO
ALTER DATABASE [videogameloans] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [videogameloans] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [videogameloans] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [videogameloans] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [videogameloans] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [videogameloans] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [videogameloans] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [videogameloans] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [videogameloans] SET  MULTI_USER 
GO
ALTER DATABASE [videogameloans] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [videogameloans] SET DB_CHAINING OFF 
GO
ALTER DATABASE [videogameloans] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [videogameloans] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [videogameloans] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [videogameloans] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [videogameloans] SET QUERY_STORE = ON
GO
ALTER DATABASE [videogameloans] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [videogameloans]
GO
/****** Object:  User [victus]    Script Date: 26/02/2025 16:59:54 ******/
CREATE USER [victus] FOR LOGIN [victus] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [victus]
GO
/****** Object:  Table [dbo].[Prestem]    Script Date: 26/02/2025 16:59:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prestem](
	[Codi] [int] IDENTITY(1,1) NOT NULL,
	[Email_Usuari] [varchar](255) NULL,
	[Nom_Videojoc] [varchar](100) NULL,
	[Data_inici] [date] NOT NULL,
	[Data_fi] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[Codi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuari]    Script Date: 26/02/2025 16:59:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuari](
	[Email] [varchar](255) NOT NULL,
	[Nom] [varchar](100) NOT NULL,
	[Password] [varchar](100) NOT NULL,
	[Tipus] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Videojoc]    Script Date: 26/02/2025 16:59:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Videojoc](
	[UID] [int] IDENTITY(1,1) NOT NULL,
	[Nom] [varchar](100) NOT NULL,
	[Any_Publicacio] [int] NOT NULL,
	[Unitats] [int] NOT NULL,
	[Plataforma] [varchar](100) NULL,
	[Publicadora] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[UID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Usuari] ADD  DEFAULT ('user') FOR [Tipus]
GO
ALTER TABLE [dbo].[Prestem]  WITH CHECK ADD FOREIGN KEY([Email_Usuari])
REFERENCES [dbo].[Usuari] ([Email])
GO
ALTER TABLE [dbo].[Prestem]  WITH CHECK ADD FOREIGN KEY([Nom_Videojoc])
REFERENCES [dbo].[Videojoc] ([Nom])
GO
USE [master]
GO
ALTER DATABASE [videogameloans] SET  READ_WRITE 
GO
