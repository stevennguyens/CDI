﻿using System;
using System.Collections.Generic;

namespace CDI.Models;

public partial class Note
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }
}
