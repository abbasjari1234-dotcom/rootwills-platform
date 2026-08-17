-- Sample depots (replace with real coordinates for your actual fulfilment
-- centres — these are illustrative UK regional points).
insert into depots (name, region, postcode, latitude, longitude) values
  ('Manchester Hub',   'North West',        'M24 4GA', 53.5547, -2.1935),
  ('Leeds Hub',        'Yorkshire',         'LS10 1AB', 53.7965, -1.5477),
  ('Birmingham Hub',   'West Midlands',     'B1 1AA',  52.4862, -1.8904),
  ('London Hub',       'Greater London',    'E1 6AN',  51.5155, -0.0722);

insert into products (sku, name, category, description, unit, base_price) values
  ('GR-001', 'Baked Beans, 6x420g',        'grocery',       'Case of tinned baked beans in tomato sauce.', 'case of 6',  4.80),
  ('BV-001', 'Cola 330ml, 24 cans',        'beverages',     'Case of classic cola cans.',                   'case of 24', 8.40),
  ('CF-001', 'Mixed Sweets, 3kg tub',      'confectionery', 'Pick-and-mix confectionery, bulk tub.',        '3kg tub',    11.50),
  ('CT-001', 'Napkins, 5000 count',        'catering',      'Bulk case of paper napkins.',                  'case of 5000', 22.00);
