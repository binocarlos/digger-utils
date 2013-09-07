var utils = require('../src');

describe('digger-utils', function(){

	it('should produce a digger id', function() {
		var id = utils.diggerid();

		id.should.be.a('string');
		id.length.should.equal(32);
	})

	it('should produce a littleid', function() {
		var id = utils.littleid();

		id.should.be.a('string');
		id.length.should.equal(6);
	})

	it('should check arrays', function() {
		var arr = [3,4,3];
		var bool = true;
		var string = '34343';
		var num = 3434;
		var object = {};
		var fn = function(){}

		utils.isArray(arr).should.equal(true);
		utils.isArray(bool).should.equal(false);
		utils.isArray(string).should.equal(false);
		utils.isArray(num).should.equal(false);
		utils.isArray(object).should.equal(false);
		utils.isArray(fn).should.equal(false);
	})

	it('should tell the difference between a digger id and selector string', function(){

		utils.isdiggerid('thing.class').should.equal(false);
		utils.isdiggerid(utils.diggerid()).should.equal(true);
	})

	it('should convert args to arrays', function() {
		function testfn(){
			var args = utils.toArray(arguments);

			utils.isArray(args).should.equal(true);
			args[1].should.equal(34);
		}

		testfn(20, 34, 56);
	})

	it('should export a user stripping its private fields', function(){

		var user = {
			name:'test',
			height:34,
			_keys:{
				private:3434
			}
		}

		var exported = utils.export_user(user);

		(exported._keys===undefined).should.equal(true);
	})

	it('should combine tree results', function(){
		var arr = [{
			a:10,
			_digger:{
				diggerid:3,
				diggerparentid:2
			}
		},{
			a:11,
			_digger:{
				diggerid:2
			}
		},{
			a:12,
			_digger:{
				diggerid:10
			}
		}]

		var results = utils.combine_tree_results(arr);
		results.length.should.equal(2);
		results[0]._children[0].a.should.equal(10);

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
