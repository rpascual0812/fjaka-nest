create language plpythonu;

create or replace function insert_logs()
    returns trigger
as $insertlogs$

# function definition
def generatecomment(colname, colordinal):
    comment = None
    exceptlist = ['id']
    coldesc = plpy.execute("select col_description("+ repr(TD['relid']) +", "+ repr(colordinal) +")")

    if colname not in exceptlist:
        if TD['old'][colname] != TD['new'][colname]:
            if TD['old'][colname] == None and colname == "status":
                TD['old'][colname] = "N/A"

            if TD['new'][colname] == None and colname == "status":
                TD['new'][colname] = "N/A"

            comment = str(coldesc[0].get('col_description')) + ' was changed from ' + str(TD['old'][colname]) + ' to ' + str(TD['new'][colname])
        return comment
    else:
        pass

# this will run first
tablename = TD['table_name']
tablecols = plpy.execute("SELECT attname, attnum from pg_attribute where attrelid = (select distinct(tableoid) from "+ tablename +") and attnum > 0 and attisdropped = 'f'")
systemcomment = []

for i in tablecols:
    data = generatecomment(i['attname'], i['attnum'])
    if data:
        systemcomment.append(data)

if systemcomment:
    systemcomment = '<br />'.join(systemcomment)
    if tablename == 'audits':
        plpy.execute("insert into logs values ("+ str(TD['old']['pk']) +", $$0$$, $$now()$$, $$"+ str('<span class="text-sys red">') + str(systemcomment) + str('</span>') +"$$);")
    else:
        lineitem = plpy.execute("select lineitem from qaform where pk = "+ str(TD['old']['qaformpk']));
        plpy.execute("insert into logs values ("+ str(TD['old']['auditspk']) +", $$0$$, $$now()$$, $$"+ str('<span class="text-sys red">') + str(lineitem[0].get('lineitem')) +" - "+ str(systemcomment) + str('</span>') +"$$);")

$insertlogs$ language plpythonu;

create trigger insert_audits_logs after update on audits for each row execute procedure insertlogsfunc();
create trigger insert_qa_logs after update on qa for each row execute procedure insertlogsfunc();