//= require_tree .
//= require_self

if (Em.TEMPLATES['application/application']){
    Em.TEMPLATES['application'] = Em.TEMPLATES['application/application']
    Em.TEMPLATES['apps'] = Em.TEMPLATES['application/apps']
}
