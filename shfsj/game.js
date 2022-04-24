
/**
 * @author Administrator
 */
	
			var my=new Object();//创建一个人物对象
			var goods=new Array();//自己的商品;
			var shop=new Array();//商店里的商品列表
			var last = new Array();//特价商品信息
				my.addSaving=function()//存款自动增加
				{
					this.saving=Math.floor(this.saving*SAVING_PERCENT);
				}
				
				my.addArrear=function()//贷款自动增加
				{
					this.arrear=Math.floor(this.arrear*ARREAR_PERCENT);	
				}
				my.validate=function()//检测一些人物的属性
				{
					if(parseInt($("date").innerText)==MAX_DATE)
					{
						var money=my.money+my.saving-my.arrear;
						if(money>0)
						alert(MAX_DATE+"天已经过去了,经过你的不屑努力,你挣得了 "+money +" 元");
						else alert(MAX_DATE+"天已经过去了,你已经欠下了 "+Math.abs(money) +" 元高利贷");
					} 
					
					if(this.arrear>=MAX_ARREAR)
					{
						alert("由于你欠了高达 "+this.arrear+" 元高利贷不还\n债主叫人把你狠狠的打了一顿\n声称明天又会来找你!\n\n健康减少 3");
						this.sethealth(-3);
					}
					
					if(my.health<=0)
					{
						 var money=my.money+my.saving-my.arrear;
						 var date=$("date").innerText;
						 var msg="社会太黑暗了,经过 "+date+" 天的劳累,你病倒了\n";
						 if(money>=0)
						 {
						 	msg+="攒下了 "+money+" 元血汗钱!";
						 }else
						 {
						 	msg+="还欠下高利贷 "+money+" 元!";
						 }
						alert(msg);
						window.close();
					}
					for(var i=0;i<last.length;i++)
						{
							alert(last[i][1]);
						}
						last.length=0;
					
				}
				my.sethealth=function(sum)//改变健康值
				{
					my.health+=sum;
					my.maxgoodscount+=sum;
					
				}
				my.showGoods=function()//显示人物的物品
				{
					var goodsHtmlElement=$("goods");
					ListUtil.clear(goodsHtmlElement);
					for(var i=0;i<goods.length;i++)
					{
						var option=new Option(printf(goods[i][0],12)+printf(goods[i][1],7)+goods[i][2]);
						goodsHtmlElement.add(option);
					}
				}
				my.display=function()//显示人物属性
				{ 
					$("arrear").innerText=Math.floor(this.arrear);
					$("money").innerText=this.money;
					$("saving").innerText=Math.floor(this.saving);
					$("health").innerText=this.health;
					$("goodscount").innerText=this.goodsCount+" / "+my.maxgoodscount+" 个"
					my.showGoods();
				}
			function init()//初始化人物
			{
				my.money=INIT_MONEY;//人物的金钱
				my.saving=INIT_SAVING;//人物的存款
				my.arrear=INIT_MONEY+INIT_SAVING;//欠款
				my.health=MAX_GOODS_SIZE;//健康
				my.maxgoodscount=MAX_GOODS_SIZE;//健康的原始值
				my.goodsCount=0;//人物的物品数量
				my.display();
				showgoods();
			}
			function setGoods(buyGoods,count)//得到物品,并且整理物品
			{
				my.goodsCount+=count;//更新拥有物品数量
							for(var i=0;i<goods.length;i++)//重叠物品
							{
								if(goods[i][0]==buyGoods[0])
								{
									var price=Math.floor((goods[i][1]*goods[i][2]+buyGoods[1]*count)/(count+goods[i][2]));
									goods[i][1]=price;
									goods[i][2]=count+goods[i][2];
									my.display();
									return;
								}
							}
							goods.push(new Array(buyGoods[0],buyGoods[1],count));
							my.display();
			}
			function buy()//购买物品
			{
				var shoplist=$("shop");
				if(shoplist.selectedIndex<0)alert("请选择一个需要购买的物品");
				else{
						var buyGoods=shop[shoplist.selectedIndex];
						var maxsize=Math.floor(my.money/buyGoods[1]);//金钱最大购买力;
						if(my.maxgoodscount-my.goodsCount<=0)
						{
							alert("我已经拿不动更多的东西了!");
							return;
						}
						var count=window.prompt("请输入要购买的数量:",maxsize>my.maxgoodscount-my.goodsCount?my.maxgoodscount-my.goodsCount:maxsize);
						if(count==null||count=="0") return;
						else{
							count=parseInt(count);
							if(count<=(maxsize>my.maxgoodscount-my.goodsCount?my.maxgoodscount-my.goodsCount:maxsize)&&count>=0){}
							else
							{
								alert("你输入的数量不正确!");
								return;
							}
							my.money-=count*buyGoods[1];
							setGoods(buyGoods,count);
						}
					}
			}
			function back()//还钱
			{
				var sum=window.prompt("请输入要还的数目:",my.arrear<my.money?my.arrear:my.money)
				if(sum==null)
				{
					return;
				}
				else if(sum<=my.arrear&&sum>=0&&sum<=my.money)
				{
					my.arrear-=sum;
					my.money-=sum;
				}else
				{
					alert("你输入的数目不正确");
				}
				my.display();
			}
			function saving()
			{
				if(confirm("请选择你要的服务:\n\n\n  存款(点击确认)          取款（点击取消）"))
				{
					
					var money=prompt("请输入要存入的金额:",my.money);
					if(money==null||money==0)
					{
						return;
					}else if(money>0&&money<=my.money)
					{
						my.saving+=parseInt(money);
						my.money-=parseInt(money);
					}else
					{
						alert("对不起,你输入的金额有误!");
					}
				}
				else{
					var money=prompt("你在银行中的存款有 :"+my.saving+" 元\n请输入你要提取的金额:",my.saving);
					if(money==null)
					{
						return;
					}else if(money>0&&money<=my.saving)
					{
						my.saving-=parseInt(money);
						my.money+=parseInt(money);
					}else
					{
						alert("对不起,你输入的金额有误!");
					}
					
				}
				my.display();
				
			}
			function sell()
			{

				var shoplist=$("goods");
				var goodsindex=-1;
				if(shoplist.selectedIndex<0)alert("请选择一个需要卖出的物品");
				else{
						
						var sellGoods=goods[shoplist.selectedIndex];
						//alert(shop+"\n"+sellGoods);
						for(var i=0;i<shop.length;i++)
							{
								//alert(shop[i][0]);
								if(shop[i][0]==sellGoods[0])
								{
									goodsindex=i;
								}
							}
											//alert(goodsindex);
							if(goodsindex==-1)
							{
								alert("这里没有人购买这种物品!");
								return;
							}
						var count=window.prompt("请输入要卖出的数量:",sellGoods[2]);
						if(count==null) return;
						else{
							count=parseInt(count);
							if(count<=sellGoods[2]&&count>=0){}
							else
							{
								alert("你输入的数量不正确!");
								return;
							}
							
							my.money+=count*shop[goodsindex][1];
							my.goodsCount-=count;//更新拥有物品数量
							sellGoods[2]-=count;
							if(sellGoods[2]==0)//删除数量为0的物品
							{
								goods[shoplist.selectedIndex]=goods[goods.length-1];
								goods.pop();
							}
							my.display();
						}
					}
			}
			function showgoods()//生成商品列表,将商品列表显示出来
			{
				var size=SHOP_LIST_SIZE+Math.floor(Math.random()*(SHOP_LIST_ADD+1));//随机生成商品的数目;
					shop.length=0;
					lable1:while(size>0)
					{
						var buf=Math.floor(Math.random()*shopGoods.length);//随机生成生成一个可能的商品
						for(var i=0;i<shop.length;i++)//取消生成的重复物品
						{
							
							if(shop[i][0]==shopGoods[buf][0])
							{
								continue lable1;
							}
						}
						//生成物品的随机价格,并且放入物品栏
						shop.push(new Array(shopGoods[buf][0],Math.floor(shopGoods[buf][1]*((Math.random()*(shopGoods[buf][2]-1))+1)),shopGoods[buf][3],shopGoods[buf][4]));
						size--;
					}
					//生成惊爆价
					if (Math.random() <= MAX_MIN_PRICE_PERCENT) {
						var count = Math.floor(Math.random() * 2 + 1);
						var price = 0;
						
						lable: while (count > 0) {
							var good =new Array();
							 good[0]=Math.floor(Math.random() * shop.length);
							for (var i = 0; i < last.length; i++) {
								if (last[i][0] == good[0]) 
									continue lable;
							}
							if(Math.floor(Math.random()*2)>=1)//涨价
							{
								shop[good[0]][1] = Math.floor((Math.random() * (MAX_PRICE - MIN_PRICE) + MIN_PRICE) * shop[good][1]);
								good[1]=(typeof(shop[good][2])=="undefined"?"这里卖"+shop[good][0]+"的人很少":shop[good][2])+"\n\n"+ shop[good][0]+" 供不应求\n价格高达:"+shop[good][1];
							}
							else{//降价
								shop[good][1] = Math.floor((Math.random() * (MAX_PERCENT-MIN_PERCENT)+MIN_PERCENT)* shop[good][1]);
								good[1]=(typeof(shop[good][3])=="undefined"?"黑市里到处充斥着"+shop[good][0]:shop[good][3])+"\n\n"+ shop[good][0]+" 无人问津\n跳楼价:"+shop[good][1];
							}
							last.push(good);
							count--;
							
							}
						}
					
						var shopHtmlElement=$("shop");
						ListUtil.clear(shopHtmlElement);
						shop.sort(sortGoods);
						for(var i=0;i<shop.length;i++)
						{
							var option=new Option(printf(shop[i][0],12)+shop[i][1],shop[i][1]);
							shopHtmlElement.add(option);
						}
			}
			function getEvent()//发生一个随机事件
			{
				var evt= Math.floor(Math.random()*Events.length);
				if(Math.random()<=EVENT_PERCENT)
				{ 
					switch(Events[evt][1])
					{
						case 0:
							var msg=Events[evt][0].replace("$",Math.abs(Events[evt][2]));
							my.money+=Events[evt][2];
							alert(msg);
							break;
						case 1:
							var money=Math.floor(Events[evt][2]*my.money);
							var msg=Events[evt][0].replace("$",Math.abs(money));
							my.money+=money;
							alert(msg);
							break;
						break;
						case 2:
							var good=shopGoods[Math.floor(Math.random()*shopGoods.length)];
							var sum=Math.floor(Math.random()*(Events[evt][3]-Events[evt][2])+Events[evt][2]);
								
							var msg=Events[evt][0].replace("$",sum);
								msg=msg.replace("&",good[0]);
								alert(msg);
								if(my.maxgoodscount-my.goodsCount<=0)
								{
									alert("可是我拿不了这么多东西了!");
								}else if(my.maxgoodscount-my.goodsCount-sum>=0)
								{
									setGoods(new Array(good[0],0),sum);
								}else
								{
									sum=my.maxgoodscount-my.goodsCount;
									alert("可是我只能拿 "+sum+" 个了!");
									setGoods(new Array(good[0],0),sum);
								}
								
								
						break;
						case 3://健康
							var msg=Events[evt][0].replace("$",Events[evt][2]);
							my.sethealth(-Events[evt][2]);
							alert(msg);
							
						break;
						case 4:
							var msg=Events[evt][0].replace("$",Math.abs(Events[evt][2]));
							my.saving+=Events[evt][2];
							alert(msg);
						case 5:
							if(my.saving<=0)break;
							//alert(Events[evt][2]*my.saving);
							var money=Math.floor(Events[evt][2]*my.saving);
							var msg=Events[evt][0].replace("$",Math.abs(money));
							my.saving+=money;
							alert(msg);
						break;
					}
				}
			}
			function goHospital()
			{
				 var money=(MAX_GOODS_SIZE-my.health)*HEALTH_MONEY;
				 var msg="每点健康值需要 "+HEALTH_MONEY+" 元治疗费用,您供需 "+money+" 元\n";
				 if(money>my.money)
				 {
				 	alert(msg+"你这个穷光蛋不准入内!");
				 }else
				 {
				 	if(confirm(msg+"您需要治疗吗?"))
					{
						my.sethealth(MAX_GOODS_SIZE-my.health);
						my.money-=money;
						my.display();
					}
				 }
				 
			}
			function goAbroad()
			{
				var msg="永远离开这座城市, 在另一个国家生活需要至少1000000元\n";
				if(my.money<1000000)
				{
					alert(msg+"你这个穷光蛋不准入内!");
				}else
				{
					if(confirm(msg+"您确认要离开吗?"))
					{
						var items = ["巴拿马", "所罗门群岛", "斯洛伐克", "贝宁", "圣多美和普林西比", "埃及", "中非", "冈比亚", "以色列", "科特迪瓦", "佛得角", "亚美尼亚", "波斯尼亚", "阿尔巴尼亚", "比利时", "马来西亚", "伊拉克", "苏里南", "津巴布韦", "伊朗", "布隆迪", "巴勒斯坦", "秘鲁", "立陶宛", "几内亚比绍", "智利", "新加坡", "卡塔尔", "利比亚", "萨摩亚", "墨西哥", "朝鲜", "缅甸", "柬埔寨", "英国", "巴西", "阿富汗", "日本", "格鲁吉亚", "巴基斯坦", "爱沙尼亚", "孟加拉", "毛里塔尼亚", "马尔代夫", "匈牙利", "沙特", "尼日尔", "拉脱维亚", "文莱", "哈萨克斯坦", "波兰", "安道尔", "卢森堡", "塞拉利昂", "阿曼", "台湾", "印度", "毛里求斯", "斯洛文尼亚", "韩国", "古巴", "希腊", "蒙古", "纳米比亚", "乍得", "摩纳哥", "埃塞俄比亚", "丹麦", "挪威", "哥伦比亚", "格林纳达", "摩洛哥", "德国", "斯里兰卡", "苏丹", "汤加", "澳大利亚", "新西兰", "叙利亚", "突尼斯", "刚果金", "阿根廷", "阿尔及利亚", "南非", "奥地利", "乌干达", "特立尼达和多巴哥", "喀麦隆", "塞舌尔", "葡萄牙", "保加利亚", "不丹", "东帝汶", "乌拉圭", "委内瑞拉", "瑞士", "玻利维亚", "西班牙", "摩尔多瓦", "加纳", "土库曼斯坦", "圭亚那", "吉尔吉斯", "坦桑尼亚", "尼日利亚", "塔吉克斯坦", "乌兹别克斯坦", "阿联酋", "马里", "瑞典", "白俄罗斯", "多哥", "法国", "罗马尼亚", "圣卢西亚", "俄罗斯", "赞比亚", "加蓬", "科威特", "卢旺达", "几内亚", "塞内加尔", "赤道几内亚", "泰国", "瑙鲁", "厄瓜多尔", "老挝", "荷兰", "马耳他", "越南", "尼泊尔", "博茨瓦纳", "利比里亚", "约旦", "多米尼克", "爱尔兰", "也门", "安哥拉", "吉布提", "巴林", "瓦努阿图", "土耳其", "美国", "刚果布", "塞浦路斯", "冰岛", "莱索托", "巴哈马", "意大利", "菲律宾", "索马里", "印尼", "阿塞拜疆", "肯尼亚", "巴巴多斯", "牙买加", "塞尔维亚", "列支敦士登", "密克罗尼西亚", "马其顿", "新几内亚", "黎巴嫩", "斐济", "莫桑比克", "厄立特里亚", "圣马力诺", "布基纳法索", "捷克", "芬兰", "科摩罗", "克罗地亚", "加拿大", "安提瓜和巴布达", "马达加斯加", "乌克兰", "图瓦卢", "圣文森特和格林纳丁斯", "多米尼加", "哥斯达黎加", "基里巴斯", "斯威士兰", "巴拉圭", "帕劳", "马拉维", "萨尔瓦多", "尼加拉瓜", "海地", "南苏丹", "伯利兹", "危地马拉", "洪都拉斯", "黑山共和国", "圣基茨和尼维斯","梵蒂冈", "马绍尔群岛"];
						var item = items[Math.floor(Math.random()*items.length)];
						alert("几天后，人们发现你出现在"+item);
					}
				}

			}
			function changeAdd()//移动到另一个城市
			{
				$("date").innerText=parseInt($("date").innerText)+1;//增加日期
				
				getEvent();//产生一个随机事件
				my.addArrear();
				my.addSaving();//修改存款和贷款
				showgoods();//更新商品
				my.display();//更新人物属性
				my.validate();//检测人物的属性
				my.showGoods();//显示自己的商品
				
			}
			function sortGoods(a,b)
			{
				//alert("aaaaaaaaaaa");
				//alert(a+"   "+b);
				if(a[1]>b[1])return 1;
				else return -1;
				
			}
			function printf(str,length)
			{
				var strlength=new String(str).length;
				for (var i = 0; i < length - strlength; i++) str=str+"   ";
				return str;
			}
			function $(id){return document.getElementById(id);}
			/////////////////////////////////////////////////////////
			//alert("*"+printf(68,10)+"\n*"+printf("wang",10));
			
			
			
