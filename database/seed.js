const { query } = require("../utils/mysql");

(async function () {
  try {
    // (username, password)
    // admin, 12345678
    // user1, 12345678
    const userSeedSQL = `INSERT INTO users (name, username, password, phone_number) VALUES
    ('admin', 'admin', '$2b$15$MXvGPdgqMZK/FJhtZOLnkeRD/T2cXpqlGsotKzRh7/JAOC1hcHMRW', '08512345678'),
    ('User 1', 'user1', '$2b$15$NkZSl4mtY6Ei1JqkSyUlDecGcwFYEWZPkCTAz5lqkq5R3YQA8ChF2', '08123456789');`;

    const movieSeedSQL = `INSERT INTO movies (name, genre, poster_url, synopsis, rating, duration) VALUES
    ('Saw X', 'horror,mystery,thriller', 'https://cms2.cinepolis.co.id/Gallery/CPL/MOV/Movie/Thumbnail/a9d6613133604e35b9b6004123828747.jpg', 'A sick and desperate John travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer only to discover the entire operation is a scam to defraud the most vulnerable.', 6.7, 118),
    ('Pocong the Origin', 'adventure,horror', 'https://m.media-amazon.com/images/M/MV5BMmI4YTViNjktYWIyMC00NDliLWEzNDMtY2MzYTk5YjczM2IwXkEyXkFqcGdeQXVyNzY4NDQzNTg@._V1_FMjpg_UY720_.jpg', "Ananta, a cold-blooded killer has been executed by the State. Sasthi, his only daughter, has to deliver her father's body to be buried in his hometown.", 5.5, 90);`;

    const cinemaSeedSQL = `INSERT INTO cinemas (name, address) VALUES 
    ('CGV Cinema Grand Batavia Tangerang', 'Jl. Raya Grand Batavia, Sindangsari, Kec. Ps. Kemis, Kabupaten Tangerang, Banten'),
    ('Cinepolis CitiPlaza Kutabumi', 'Jl. Raya Kutabumi No.8, Kuta Baru, Kec. Ps. Kemis, Kabupaten Tangerang, Banten');`;

    const studioSeedSQL = `INSERT INTO studios (cinema_id, name) VALUES 
    (1, 'Audi 1'),
    (1, 'Audi 2'),
    (1, 'Audi 3'),
    (1, 'Audi 4'),
    (2, 'REGULAR 2D');`;

    const seatSeedSQL = `INSERT INTO seats (studio_id, name) VALUES 
    (1, '1A'), (1, '2A'), (1, '3A'), (1, '4A'), (1, '5A'), (1, '6A'), (1, '7A'), (1, '8A'), (1, '9A'), (1, '10A'), (1, '1B'), (1, '2B'), (1, '3B'), (1, '4B'), (1, '5B'), (1, '6B'), (1, '7B'), (1, '8B'), (1, '9B'), (1, '10B'), (1, '1C'), (1, '2C'), (1, '3C'), (1, '4C'), (1, '5C'), (1, '6C'), (1, '7C'), (1, '8C'), (1, '9C'), (1, '10C'), (1, '1D'), (1, '2D'), (1, '3D'), (1, '4D'), (1, '5D'), (1, '6D'), (1, '7D'), (1, '8D'), (1, '9D'), (1, '10D'), (1, '1E'), (1, '2E'), (1, '3E'), (1, '4E'), (1, '5E'), (1, '6E'), (1, '7E'), (1, '8E'), (1, '9E'), (1, '10E'), (1, '1F'), (1, '2F'), (1, '3F'), (1, '4F'), (1, '5F'), (1, '6F'), (1, '7F'), (1, '8F'), (1, '9F'), (1, '10F'), (1, '1G'), (1, '2G'), (1, '3G'), (1, '4G'), (1, '5G'), (1, '6G'), (1, '7G'), (1, '8G'), (1, '9G'), (1, '10G'), (1, '1H'), (1, '2H'), (1, '3H'), (1, '4H'), (1, '5H'), (1, '6H'), (1, '7H'), (1, '8H'), (1, '9H'), (1, '10H'),
    (2, '1A'), (2, '2A'), (2, '3A'), (2, '4A'), (2, '5A'), (2, '6A'), (2, '7A'), (2, '8A'), (2, '9A'), (2, '10A'), (2, '1B'), (2, '2B'), (2, '3B'), (2, '4B'), (2, '5B'), (2, '6B'), (2, '7B'), (2, '8B'), (2, '9B'), (2, '10B'), (2, '1C'), (2, '2C'), (2, '3C'), (2, '4C'), (2, '5C'), (2, '6C'), (2, '7C'), (2, '8C'), (2, '9C'), (2, '10C'), (2, '1D'), (2, '2D'), (2, '3D'), (2, '4D'), (2, '5D'), (2, '6D'), (2, '7D'), (2, '8D'), (2, '9D'), (2, '10D'), (2, '1E'), (2, '2E'), (2, '3E'), (2, '4E'), (2, '5E'), (2, '6E'), (2, '7E'), (2, '8E'), (2, '9E'), (2, '10E'), (2, '1F'), (2, '2F'), (2, '3F'), (2, '4F'), (2, '5F'), (2, '6F'), (2, '7F'), (2, '8F'), (2, '9F'), (2, '10F'), (2, '1G'), (2, '2G'), (2, '3G'), (2, '4G'), (2, '5G'), (2, '6G'), (2, '7G'), (2, '8G'), (2, '9G'), (2, '10G'), (2, '1H'), (2, '2H'), (2, '3H'), (2, '4H'), (2, '5H'), (2, '6H'), (2, '7H'), (2, '8H'), (2, '9H'), (2, '10H'),
    (3, '1A'), (3, '2A'), (3, '3A'), (3, '4A'), (3, '5A'), (3, '6A'), (3, '7A'), (3, '8A'), (3, '9A'), (3, '10A'), (3, '1B'), (3, '2B'), (3, '3B'), (3, '4B'), (3, '5B'), (3, '6B'), (3, '7B'), (3, '8B'), (3, '9B'), (3, '10B'), (3, '1C'), (3, '2C'), (3, '3C'), (3, '4C'), (3, '5C'), (3, '6C'), (3, '7C'), (3, '8C'), (3, '9C'), (3, '10C'), (3, '1D'), (3, '2D'), (3, '3D'), (3, '4D'), (3, '5D'), (3, '6D'), (3, '7D'), (3, '8D'), (3, '9D'), (3, '10D'), (3, '1E'), (3, '2E'), (3, '3E'), (3, '4E'), (3, '5E'), (3, '6E'), (3, '7E'), (3, '8E'), (3, '9E'), (3, '10E'), (3, '1F'), (3, '2F'), (3, '3F'), (3, '4F'), (3, '5F'), (3, '6F'), (3, '7F'), (3, '8F'), (3, '9F'), (3, '10F'), (3, '1G'), (3, '2G'), (3, '3G'), (3, '4G'), (3, '5G'), (3, '6G'), (3, '7G'), (3, '8G'), (3, '9G'), (3, '10G'), (3, '1H'), (3, '2H'), (3, '3H'), (3, '4H'), (3, '5H'), (3, '6H'), (3, '7H'), (3, '8H'), (3, '9H'), (3, '10H'),
    (4, '1A'), (4, '2A'), (4, '3A'), (4, '4A'), (4, '5A'), (4, '6A'), (4, '7A'), (4, '8A'), (4, '9A'), (4, '10A'), (4, '1B'), (4, '2B'), (4, '3B'), (4, '4B'), (4, '5B'), (4, '6B'), (4, '7B'), (4, '8B'), (4, '9B'), (4, '10B'), (4, '1C'), (4, '2C'), (4, '3C'), (4, '4C'), (4, '5C'), (4, '6C'), (4, '7C'), (4, '8C'), (4, '9C'), (4, '10C'), (4, '1D'), (4, '2D'), (4, '3D'), (4, '4D'), (4, '5D'), (4, '6D'), (4, '7D'), (4, '8D'), (4, '9D'), (4, '10D'), (4, '1E'), (4, '2E'), (4, '3E'), (4, '4E'), (4, '5E'), (4, '6E'), (4, '7E'), (4, '8E'), (4, '9E'), (4, '10E'), (4, '1F'), (4, '2F'), (4, '3F'), (4, '4F'), (4, '5F'), (4, '6F'), (4, '7F'), (4, '8F'), (4, '9F'), (4, '10F'), (4, '1G'), (4, '2G'), (4, '3G'), (4, '4G'), (4, '5G'), (4, '6G'), (4, '7G'), (4, '8G'), (4, '9G'), (4, '10G'), (4, '1H'), (4, '2H'), (4, '3H'), (4, '4H'), (4, '5H'), (4, '6H'), (4, '7H'), (4, '8H'), (4, '9H'), (4, '10H'),
    (5, '1A'), (5, '2A'), (5, '3A'), (5, '4A'), (5, '5A'), (5, '6A'), (5, '7A'), (5, '8A'), (5, '9A'), (5, '10A'), (5, '1B'), (5, '2B'), (5, '3B'), (5, '4B'), (5, '5B'), (5, '6B'), (5, '7B'), (5, '8B'), (5, '9B'), (5, '10B'), (5, '1C'), (5, '2C'), (5, '3C'), (5, '4C'), (5, '5C'), (5, '6C'), (5, '7C'), (5, '8C'), (5, '9C'), (5, '10C'), (5, '1D'), (5, '2D'), (5, '3D'), (5, '4D'), (5, '5D'), (5, '6D'), (5, '7D'), (5, '8D'), (5, '9D'), (5, '10D'), (5, '1E'), (5, '2E'), (5, '3E'), (5, '4E'), (5, '5E'), (5, '6E'), (5, '7E'), (5, '8E'), (5, '9E'), (5, '10E'), (5, '1F'), (5, '2F'), (5, '3F'), (5, '4F'), (5, '5F'), (5, '6F'), (5, '7F'), (5, '8F'), (5, '9F'), (5, '10F'), (5, '1G'), (5, '2G'), (5, '3G'), (5, '4G'), (5, '5G'), (5, '6G'), (5, '7G'), (5, '8G'), (5, '9G'), (5, '10G'), (5, '1H'), (5, '2H'), (5, '3H'), (5, '4H'), (5, '5H'), (5, '6H'), (5, '7H'), (5, '8H'), (5, '9H'), (5, '10H');`;

    await query(userSeedSQL);
    await query(movieSeedSQL);
    await query(cinemaSeedSQL);
    await query(studioSeedSQL);
    await query(seatSeedSQL);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
})();
