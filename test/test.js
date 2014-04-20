var utils = require('../src');

describe('digger-utils', function(){

	it('should produce a digger id', function() {
		var id = utils.diggerid();

		id.should.be.type('string');
		id.length.should.equal(32);
	})

	it('should produce a littleid', function() {
		var id = utils.littleid();

		id.should.be.type('string');
		id.length.should.equal(6);
	})

	it('should tell us if an object is empty', function() {

		var obj = {};

		utils.is_object_empty(obj).should.equal(true);

		obj.hello = 'world';

		utils.is_object_empty(obj).should.equal(false);
		
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
				path:'/a',
				inode:'b'
			}
		},{
			a:12,
			_digger:{
				diggerid:10,
				path:'/a/b/c',
				inode:'d'
			}
		},{
			a:11,
			_digger:{
				diggerid:2,
				path:'/a/b',
				inode:'c'
			}
		}]

		var results = utils.combine_tree_results(arr);


		results.length.should.equal(1);

		results[0]._children[0]._children[0].a.should.equal(12)		

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

  it('should inherit classes', function() {
		function Parent(){

		}

		Parent.prototype.hello = function(){
			return 'world';
		}

		function Child(){

		}

		utils.inherits(Child, Parent);

		var child = new Child();

		var st = child.hello();

		st.should.equal('world');
  })

  it('should strip dollars', function() {
		var data = {
			'$test':10,
			sub:{
				'$test2':20
			}
		}

		data = utils.strip_dollars(data);

		var val = data['$test'];

		if(val){
			throw new Error('value not removed');
		}
		
		var val2 = data.sub['$test2'];

		if(val2){
			throw new Error('value2 not removed');
		}
  })


  it('should flatten a tree', function() {
		var data = {
			name:'top',
			_children:[{
				name:'middle',
				_children:[{
					name:'bottom'
				}]
			}]
		}

		var flat = utils.flatten_tree(data)

		flat.length.should.equal(3)
		flat[0].name.should.equal('top')
		flat[1].name.should.equal('middle')
		flat[2].name.should.equal('bottom')

  })

})
