define([
	"jquery",
	"d3",
	"handlebar"
  ],
	function($,d3){
 		
		$(function(){
			/*var data = [4,8,15,16,23,42,56,60];
			var x = d3.scale.linear().domain([0, d3.max(data)]).range([0,420]);
			var y = d3.scale.ordinal().domain(data).rangeBands([0,300]);

			var chart = d3.select(".chart")
				.append("svg")
					.attr("class", "chart")
					.attr("width", 460)
					.attr("height", 460)
				.append("g")
					.attr("transform", "translate(10,15)");

			chart.selectAll("rect").data(data).enter()
				.append("rect")
					.attr("y", y)
					.attr("width", x)
					.attr("height", y.rangeBand());

			chart.selectAll("text").data(data).enter()
				.append("text")
					.attr("x",x)
					.attr("y", function(d){ return y(d) + y.rangeBand()/2; })
					.attr("dx", -10)
					.attr("dy", "0.35em")
					.attr("text-anchor", "end")
				.text(String);

			chart.selectAll("line").data(x.ticks(5)).enter()
				.append("line")
					.attr("x1", x)
					.attr("y1", 0)
					.attr("x2", x)
					.attr("y2", y.rangeBand() * data.length)
				.style("stroke", "#ccc");

			chart.selectAll("a").data(x.ticks(5)).enter()
				.append("text")
					.attr("class","rule")
					.attr("x", x)
					.attr("y",0)
					.attr("dy","-3")
					.attr("text-anchor","middle")
				.text(String);
			*/
			/*create bar chart*/
			var w = 20,
				h = 200,
				x = d3.scale.linear().domain([0, 1]).range([0, w]),
				y = d3.scale.linear().domain([0, 100]).rangeRound([0, h-40]),
				dataNumber = Math.ceil(parseInt(d3.select(".chart").style("width")) / w ),
				data = Array.apply(null, new Array(dataNumber)).map(Number.prototype.valueOf, 0);//[4, 3, 5, 2, 6, 8, 10, 12, 15, 20, 35, 50, 40, 80, 41, 32, 20, 21, 10, 14, 11, 10, 9, 5, 4, 6, 3, 2];

			var chart = d3.select(".chart").attr("style","overflow: hidden")
							.append("svg")
								.attr("class", "chart")
								.attr("width", "100%")
								.attr("height", h);

			var xAxis = d3.svg.axis().scale(d3.scale.linear().domain([0, 1]).range([0, 940])).orient("bottom").ticks(5);
			var yAxis = d3.svg.axis().scale(d3.scale.linear().domain([0, 100]).range([h-40,0])).orient("left").ticks(5);
			
			chart.append("g")
				.attr("class","axis")
				.attr("transform", "translate(40," + (h - 20) + ")")
				.call(xAxis);
			chart.append("g")
				.attr("class","axis")
				.attr("transform","translate(40,20)")
				.call(yAxis);
			chart.insert("rect","g").attr("class","overlayY")
				.attr("x",0).attr("y",0).attr("width","40").attr("height","200").attr("fill","white !important");

			function redraw(){
				var rect =	chart.selectAll(".graphrect").data(data, function(d){
					return d.time;
				});

				rect.enter().insert("rect",".overlayY").attr("class","graphrect")
					.attr("x", function(d,i){
						return x(i)+w;
					}).attr("y", function(d){
						return h - y(d.value) ;
					}).attr("width", w).attr("height", function(d){
						return y(d.value);
					}).attr("transform","translate(0,-20)");
				rect.transition().duration(1000).attr("x", function(d,i){
					return x(i);
				});
				rect.exit().transition().duration(1000).attr("x",function(d,i){
					return x(i)-w ;
				}).each("end",function(){
					this.remove();
				});
			}

			var timer = requestInterval(function(){
				data.push({
					'value' : parseInt(100 * Math.random()),
					'time'	: +new Date() 
				});
			}, 1000);

			requestInterval(function(){
				data.shift();
				redraw();
			}, 1000);

			/*creat chord*/
			var chordWidth = 960,
				chordHeight = 500,
				innerRadius = Math.min(width, height) * .41,
				outerRadius =innerRadius * 1.1;

			var fill = ["#000000", "#ffdd89", "#957244", "#f26223"];
			var svg = d3.select("chord").append("svg").
						.attr("width", chordWidth)
						.attr("height", chordHeight); 
		});



		function requestInterval(fn, delay){
				if( !window.requestAnimationFrame &&
					!window.webkitRequestAnimationFrame &&
					!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
					!window.oRequestAnimationFrame &&
					!window.msRequestAnimationFrame)
					return window.setInterval(fn, delay);

				var start = new Date().getTime(),
					handle = new Object();

				function loop(){
					var current = new Date().getTime(),
						delta = current-start;
						if( delta >= delay){
							fn.call();
							start = new Date().getTime();
						}
						handle.value = requestAnimationFrame(loop);
				};

				handle.value = requestAnimationFrame(loop);
				return handle; 
		}
	}
);
  	
