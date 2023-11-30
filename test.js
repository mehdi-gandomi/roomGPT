var a=[
    {
      "accuracy": 56,
      "data": [
        {
          "address": "sofa_oneseater.PNG",
          "certainty_value": 0.8374632894992828
        }
      ],
      "h": 354,
      "object": "chair",
      "object_number": 0,
      "w": 428,
      "x": 276,
      "y": 197
    },
    {
      "accuracy": 56,
      "data": [
        {
          "address": "sofa_oneseater200026.PNG",
          "certainty_value": 0.8569774031639099
        }
      ],
      "h": 506,
      "object": "chair",
      "object_number": 1,
      "w": 197,
      "x": 0,
      "y": 248
    }
  ];
  
  const children=[];
  a.forEach(item=>{
    children.push({
        "id": "e6fddd1e-bbc4-48f4-9b1a-ccbb8b759992",
        "title": "Spot",
        "x": item.x,
        "y": item.y,
        "tooltip_content": [
            {
                "type": "Heading",
                "text": item.object,
                "heading": "h3",
                "other": {
                    "id": "",
                    "classes": "",
                    "css": ""
                },
                "style": {
                    "fontFamily": "sans-serif",
                    "fontSize": 20.8,
                    "lineHeight": "normal",
                    "color": "#ffffff",
                    "textAlign": "left"
                },
                "boxModel": {
                    "width": "auto",
                    "height": "auto",
                    "margin": {
                        "top": 0,
                        "bottom": 0,
                        "left": 0,
                        "right": 0
                    },
                    "padding": {
                        "top": 10,
                        "bottom": 10,
                        "left": 10,
                        "right": 10
                    }
                },
                "id": "cb7b740e-2e1a-4f75-8faa-4305cb9930d8"
            },
            {
                "type": "Paragraph",
                "text": "some test<br>",
                "other": {
                    "id": "",
                    "classes": "",
                    "css": ""
                },
                "style": {
                    "fontFamily": "sans-serif",
                    "fontSize": 14,
                    "lineHeight": 22,
                    "color": "#ffffff",
                    "textAlign": "left"
                },
                "boxModel": {
                    "width": "auto",
                    "height": "auto",
                    "margin": {
                        "top": 0,
                        "bottom": 0,
                        "left": 0,
                        "right": 0
                    },
                    "padding": {
                        "top": 10,
                        "bottom": 10,
                        "left": 10,
                        "right": 10
                    }
                },
                "id": "4fdf51f3-fd47-435e-aa54-24283010f7ae"
            },
            {
                "type": "Button",
                "text": "Click here",
                "url": "#",
                "script": "",
                "newTab": false,
                "other": {
                    "id": "",
                    "classes": "",
                    "css": ""
                },
                "style": {
                    "backgroundColor": "#2196f3",
                    "borderRadius": 10,
                    "fontFamily": "sans-serif",
                    "fontWeight": 700,
                    "fontSize": 14,
                    "lineHeight": 44,
                    "color": "#ffffff",
                    "display": "inline-block"
                },
                "boxModel": {
                    "width": "auto",
                    "height": 44,
                    "margin": {
                        "top": 0,
                        "bottom": 0,
                        "left": 0,
                        "right": 0
                    },
                    "padding": {
                        "top": 10,
                        "bottom": 10,
                        "left": 10,
                        "right": 10
                    }
                },
                "id": "9195e254-dbde-4bab-972d-a10c87c07dff"
            }
        ]
    })
  })

  const json={
    "id": "7126a99f-83aa-4496-8b96-67efaf9a3f93",
    "artboards": [
        {
            "background_type": "image",
            "image_url": "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg",
            "children": children
        }
    ],
    "version": "6.0.15",
    "general": {
        "name": "Untitled"
    }
};
console.log(json)