CREATE TABLE `produits` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `token` varchar(255),
  `nom` varchar(255),
  `description` varchar(255),
  `prix` int,
  `type_general` varchar(255),
  `type` varchar(255)
);

CREATE TABLE `produits_vetements_tailles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `produits_token` varchar(255),
  `xs` boolean,
  `s` boolean,
  `m` boolean,
  `l` boolean,
  `xl` boolean,
  `bebe_mois` int
);

CREATE TABLE `promo` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `by_token` boolean,
  `promo_by_token` varchar(255),
  `by_type_general` boolean,
  `promo_by_type_general` varchar(255),
  `by_type` boolean,
  `promo_by_type` varchar(255)
);

CREATE TABLE `membres` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `token` varchar(255),
  `pseudo` varchar(255),
  `nom` varchar(255),
  `prenom` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `grade` varchar(255),
  `derniereco` varchar(255)
);

CREATE TABLE `panier` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_token` varchar(255),
  `produit_token` varchar(255),
  `produit_qt` int
);

CREATE TABLE `cookie_to_account` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `cookie` varchar(255),
  `user_token` varchar(255)
);

CREATE TABLE `historique_de_vente` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `produit_token` varchar(255),
  `user_token` varchar(255),
  `qt` varchar(255)
);

CREATE TABLE `historique_de_recherche` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `recherche` varchar(255),
  `recherche_sha512` varchar(255)
);

ALTER TABLE `produits` ADD FOREIGN KEY (`token`) REFERENCES `produits_vetements_tailles` (`produits_token`);

ALTER TABLE `promo` ADD FOREIGN KEY (`by_token`) REFERENCES `produits` (`token`);

ALTER TABLE `promo` ADD FOREIGN KEY (`by_type`) REFERENCES `produits` (`type`);

ALTER TABLE `promo` ADD FOREIGN KEY (`by_type_general`) REFERENCES `produits` (`type_general`);

ALTER TABLE `panier` ADD FOREIGN KEY (`user_token`) REFERENCES `membres` (`token`);

ALTER TABLE `panier` ADD FOREIGN KEY (`produit_token`) REFERENCES `produits` (`token`);

ALTER TABLE `cookie_to_account` ADD FOREIGN KEY (`user_token`) REFERENCES `membres` (`token`);

ALTER TABLE `historique_de_vente` ADD FOREIGN KEY (`user_token`) REFERENCES `membres` (`token`);
