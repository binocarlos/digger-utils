var utils = require('../src');

describe('digger-utils', function(){

	it('should produce a digger id', function() {
		var id = utils.diggerid();

		id.should.be.a('string');
		id.length.should.equal(32);
		console.log(id);
	})

	it('should produce a littleid', function() {
		var id = utils.littleid();

		id.should.be.a('string');
		id.length.should.equal(6);
		console.log(id);
	})
	
	it('should extend objects', function() {
		var a = {
			top:{
				middle:{
					bottom:{
						vala:12
					},
					vala:12
				},
				vala:12
			}
			
		}

		var b = {
			top:{
				middle:{
					bottom:{
						valb:11
					},
					valb:11
				},
				valb:11
			}
		}

		utils.extend(true, a, b);

		a.top.valb.should.equal(11);
		a.top.middle.valb.should.equal(11);
		a.top.middle.bottom.valb.should.equal(11);
  })
})
